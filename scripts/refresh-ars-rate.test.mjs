import assert from "node:assert/strict";
import test from "node:test";
import { parseDolarHoyBlue, updateBookingRate } from "./refresh-ars-rate.mjs";

const html = (sale = "1.565,00", updated = "12/11/26 09:07 PM") =>
  `<div>Dólar Libre</div><div class="topic">Compra</div><div class="value">$1.545,00</div>` +
  `<div class="topic">Venta</div><div class="value">$${sale}</div>` +
  `<span>Actualizado por última vez: ${updated}</span>`;

const booking = (rate = 1565, checkedAt = "2026-11-12T20:47:00-03:00") =>
  `  const USD_ARS_SELL_RATE = ${rate};\n` +
  `  const USD_ARS_RATE_LABEL = "DolarHoy dólar blue venta";\n` +
  `  const USD_ARS_RATE_CHECKED_AT = "${checkedAt}";\n` +
  `  const PAYMENT_LINK = "https://example.com";\n`;

test("uses the DolarHoy blue card's selling rate and Argentina update time", () => {
  assert.deepEqual(parseDolarHoyBlue(html(), new Date("2026-11-13T00:15:00Z")), {
    rate: 1565,
    checkedAt: "2026-11-12T21:07:00-03:00",
  });
});

test("rejects missing card, stale time, future time, and implausible rate", () => {
  const now = new Date("2026-11-13T00:15:00Z");
  assert.throws(() => parseDolarHoyBlue("<div>Other currency</div>", now));
  assert.throws(() => parseDolarHoyBlue(html("1.565,00", "10/11/26 09:07 PM"), now));
  assert.throws(() => parseDolarHoyBlue(html("1.565,00", "12/11/26 09:21 PM"), now));
  assert.throws(() => parseDolarHoyBlue(html("50.000,00"), now));
});

test("updates only rate and source time when source quote advances", () => {
  const quote = { rate: 1568, checkedAt: "2026-11-12T21:07:00-03:00" };
  const result = updateBookingRate(booking(), quote);
  assert.equal(result.changed, true);
  assert.match(result.updated, /USD_ARS_SELL_RATE = 1568;/);
  assert.match(result.updated, /USD_ARS_RATE_CHECKED_AT = "2026-11-12T21:07:00-03:00";/);
  assert.match(result.updated, /PAYMENT_LINK = "https:\/\/example.com";/);
});

test("rejects large rate jumps and source time going backward", () => {
  assert.throws(() => updateBookingRate(booking(), { rate: 1900, checkedAt: "2026-11-12T21:07:00-03:00" }));
  assert.throws(() => updateBookingRate(booking(), { rate: 1500, checkedAt: "2026-11-12T20:00:00-03:00" }));
  assert.equal(updateBookingRate(booking(), { rate: 1900, checkedAt: "2026-11-12T21:07:00-03:00" }, true).changed, true);
});
