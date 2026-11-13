import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE_URL = "https://dolarhoy.com/cotizaciondolarblue";
const RATE_LABEL = "DolarHoy dólar blue venta";
const HOUR = 60 * 60 * 1000;
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BOOKING_JS = resolve(ROOT, "booking.js");

function parsePeso(value) {
  if (!/^(?:\d{1,3}(?:\.\d{3})+|\d+),\d{2}$/.test(value)) {
    throw new Error(`Unexpected DolarHoy peso value: ${value}`);
  }
  const amount = Number(value.replaceAll(".", "").replace(",", "."));
  if (!Number.isFinite(amount) || amount < 100 || amount > 10_000) {
    throw new Error(`DolarHoy rate outside expected range: ${amount}`);
  }
  return amount;
}

function parseArgentinaTimestamp(value) {
  const match = /^(\d{2})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2}) (AM|PM)$/.exec(value);
  if (!match) throw new Error(`Unexpected DolarHoy update time: ${value}`);
  const [, day, month, shortYear, hour, minute, period] = match;
  const hour12 = Number(hour);
  if (hour12 < 1 || hour12 > 12 || Number(minute) > 59) {
    throw new Error(`Invalid DolarHoy update time: ${value}`);
  }
  const hour24 = (hour12 % 12) + (period === "PM" ? 12 : 0);
  const local = `20${shortYear}-${month}-${day}T${String(hour24).padStart(2, "0")}:${minute}:00`;
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Argentina/Buenos_Aires",
    timeZoneName: "shortOffset",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  });
  const candidate = new Date(Date.UTC(2000 + Number(shortYear), Number(month) - 1, Number(day), hour24, Number(minute)));
  const zoneName = formatter.formatToParts(candidate).find((part) => part.type === "timeZoneName")?.value;
  const offsetMatch = /^GMT([+-])(\d{1,2})(?::(\d{2}))?$/.exec(zoneName ?? "");
  if (!offsetMatch) throw new Error("Could not resolve Buenos Aires UTC offset");
  const offset = `${offsetMatch[1]}${offsetMatch[2].padStart(2, "0")}:${offsetMatch[3] ?? "00"}`;
  const iso = `${local}${offset}`;
  const date = new Date(iso);
  const parts = Object.fromEntries(formatter.formatToParts(date).map(({ type, value: partValue }) => [type, partValue]));
  const roundTrip = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
  if (!Number.isFinite(date.getTime()) || roundTrip !== local) {
    throw new Error(`Invalid DolarHoy calendar date: ${value}`);
  }
  return iso;
}

export function parseDolarHoyBlue(html, now = new Date()) {
  if (typeof html !== "string" || html.length > 2_000_000) throw new Error("Invalid DolarHoy HTML response");
  // The first Dólar Libre card contains Compra, Venta, and the source update time.
  // Do not fall through to the compact quote table or another currency if this
  // card changes: a failed refresh is safer than publishing the wrong amount.
  const card = /Dólar Libre<\/div>([\s\S]{0,1500}?)Actualizado por última vez:\s*([^<]{1,40})<\/span>/.exec(html);
  if (!card || !/<div class="topic">\s*Compra\s*<\/div>/.test(card[1])) {
    throw new Error("DolarHoy blue quote card was not found");
  }
  const sale = [...card[1].matchAll(/<div class="topic">\s*Venta\s*<\/div>\s*<div class="value">\s*\$?([\d.,]+)\s*<\/div>/g)];
  if (sale.length !== 1) throw new Error("DolarHoy blue selling rate is missing or ambiguous");
  const rate = parsePeso(sale[0][1]);
  const checkedAt = parseArgentinaTimestamp(card[2].trim());
  const age = new Date(now).getTime() - new Date(checkedAt).getTime();
  if (!Number.isFinite(age) || age < -5 * 60_000 || age > 48 * HOUR) {
    throw new Error("DolarHoy quote timestamp is future-dated or older than 48 hours");
  }
  return { rate, checkedAt };
}

function declaration(source, name, valuePattern) {
  const matches = [...source.matchAll(new RegExp(`^  const ${name} = (${valuePattern});$`, "gm"))];
  if (matches.length !== 1) throw new Error(`Expected exactly one ${name} declaration`);
  return matches[0];
}

export function updateBookingRate(source, quote, allowLargeChange = false) {
  const oldRate = declaration(source, "USD_ARS_SELL_RATE", "\\d+(?:\\.\\d+)?");
  const oldLabel = declaration(source, "USD_ARS_RATE_LABEL", '"[^"\\n]+"');
  const oldTimestamp = declaration(source, "USD_ARS_RATE_CHECKED_AT", '"[^"\\n]+"');
  if (JSON.parse(oldLabel[1]) !== RATE_LABEL) throw new Error("Unexpected ARS rate source label");
  const priorRate = Number(oldRate[1]);
  const priorTime = new Date(JSON.parse(oldTimestamp[1])).getTime();
  const quoteTime = new Date(quote.checkedAt).getTime();
  if (!Number.isFinite(priorRate) || priorRate <= 0 || !Number.isFinite(priorTime)) {
    throw new Error("Existing ARS rate configuration is invalid");
  }
  if (quoteTime < priorTime) throw new Error("DolarHoy quote is older than the published quote");
  if (!allowLargeChange && Math.abs(quote.rate / priorRate - 1) > 0.10) {
    throw new Error("DolarHoy rate changed by more than 10%; manual review required");
  }
  if (quoteTime === priorTime && quote.rate !== priorRate) {
    throw new Error("DolarHoy rate changed without a newer source timestamp");
  }
  const updated = source
    .replace(oldRate[0], `  const USD_ARS_SELL_RATE = ${quote.rate};`)
    .replace(oldTimestamp[0], `  const USD_ARS_RATE_CHECKED_AT = ${JSON.stringify(quote.checkedAt)};`);
  return { updated, changed: updated !== source, priorRate };
}

async function fetchSource() {
  const response = await fetch(SOURCE_URL, {
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
    headers: { Accept: "text/html", "Cache-Control": "no-cache", "User-Agent": "Tonart rate refresh (https://tonart.space/)" },
  });
  if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) {
    throw new Error(`DolarHoy returned HTTP ${response.status} or non-HTML content`);
  }
  const html = await response.text();
  if (html.length > 2_000_000) throw new Error("DolarHoy HTML response is too large");
  return html;
}

async function main(args) {
  const dryRun = args.includes("--dry-run");
  const allowLargeChange = args.includes("--allow-large-change") || process.env.ALLOW_LARGE_CHANGE === "true";
  let htmlFile;
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--dry-run" || arg === "--allow-large-change") continue;
    if (arg === "--html-file" && args[index + 1] && !args[index + 1].startsWith("--")) {
      htmlFile = args[++index];
      continue;
    }
    throw new Error("Usage: node scripts/refresh-ars-rate.mjs [--dry-run] [--html-file PATH] [--allow-large-change]");
  }
  const html = htmlFile ? await readFile(htmlFile, "utf8") : await fetchSource();
  const quote = parseDolarHoyBlue(html);
  const source = await readFile(BOOKING_JS, "utf8");
  const result = updateBookingRate(source, quote, allowLargeChange);
  if (result.changed && !dryRun) await writeFile(BOOKING_JS, result.updated, "utf8");
  process.stdout.write(`${JSON.stringify({ source: SOURCE_URL, label: RATE_LABEL, ...quote, changed: result.changed, dryRun })}\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
