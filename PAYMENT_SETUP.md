# Tonart payment link setup

The site uses a separate PayPal Business account for studio sales. The existing personal PayPal.Me link is not part of checkout. PayPal's [Payment Links guide](https://developer.paypal.com/payment-links-buttons/create-payment-link/) describes creating fixed-price links in **Pay & Get Paid → Create Payment Links and Buttons**.

Seven reusable, fixed-price **USD** links have been created in PayPal Business, one per offer. Their descriptions match the package scopes on `booking.html`. Each link limits quantity to one, requests an artist and track or EP title, and does not request a shipping address. `CHECKOUT_ENABLED` in `booking.js` is `true` for public checkout.

| `booking.js` key | PayPal service name | USD price | Payment link |
| --- | --- | ---: | --- |
| `stereo` | Tonart stereo mastering — 1 track | $39 | [Checkout](https://www.paypal.com/ncp/payment/EQD4VQUARW5SG) |
| `stem` | Tonart stem mastering — 1 track | $69 | [Checkout](https://www.paypal.com/ncp/payment/TJ4SBD24ZEJ3Y) |
| `mix` | Tonart mixing — 1 track | $129 | [Checkout](https://www.paypal.com/ncp/payment/TRKHDBP4W8T3U) |
| `mixmaster` | Tonart mixing + mastering — 1 track | $149 | [Checkout](https://www.paypal.com/ncp/payment/UBF6T8QSMLZQY) |
| `ep-stereo` | Tonart 3-track EP — stereo mastering | $99 | [Checkout](https://www.paypal.com/ncp/payment/BTQYRJ6LR7TYW) |
| `ep-stem` | Tonart 3-track EP — stem mastering | $179 | [Checkout](https://www.paypal.com/ncp/payment/C7XMZW2ZNWJJ2) |
| `ep-mixmaster` | Tonart 3-track EP — mixing + mastering | $399 | [Checkout](https://www.paypal.com/ncp/payment/ZK6CTAJZJ4JQL) |

The public URLs above are in the matching `PAYMENT_LINKS` entries at the top of `booking.js`. A blank entry would keep that offer on the booking-request path. No password, API key, or account token belongs in this repository.

All seven buyer-facing pages were opened in Chrome. Each showed the expected service name, USD price, matching total, project-title field, and PayPal and card options; Apple Pay was also shown in this browser. Available methods can vary by buyer and device. The merchant's legal identity was not displayed on these pre-payment pages, and a completed transaction has not been tested. Confirm the merchant identity shown during payment and review the public contact and policies. PayPal's guide recommends a sandbox payment or a low-value live transaction to verify that payment appears in the merchant dashboard. Only the account holder should perform a live test payment.

## Project handover and payment matching

The site does not receive PayPal webhooks or verify payments. After checkout, the buyer uses `handover.html` to prepare an email containing the chosen service, contact and **payer email**, artist and track title, an optional **buyer** PayPal transaction ID, and a private downloadable file link. The buyer must press **Send** in their mail app; opening the handover page or generating an email draft does not submit an order. The site does not store project details or host audio. Buyers using a guest card checkout may not have a PayPal Activity page from which to copy an ID, so the payer email is the main matching field.

For each handover email, search PayPal Activity by buyer transaction ID when supplied, then by payer email and payment date/title if necessary. PayPal gives buyer and seller [different transaction IDs](https://www.paypal.com/de/cshelp/article/warum-gibt-es-f%C3%BCr-dieselbe-transaktion-unterschiedliche-transaktionscodes-von-k%C3%A4ufern-und-verk%C3%A4ufern-ts2265); do not expect the buyer code to equal the seller-side receipt ID. Check that the transaction is **Completed**, its USD total and item match the selected offer, and that the link contains the correct number of usable files. Record the seller transaction ID, client email, service, file link, and agreed first-preview date in an internal project log. Reply to the customer to confirm receipt and the date. If matching fails, ask for the PayPal receipt email or buyer transaction ID before starting work. The first-preview clock starts after payment, project scope, and usable files are confirmed. A return to this site from PayPal is not proof of payment. PayPal documents the [Activity report fields](https://developer.paypal.com/reports/activity-download/) and [payment statuses](https://securepayments.paypal.com/de/cshelp/article/welche-bedeutung-hat-der-status-meiner-zahlung-oder-geldanforderung-in-meinem-paypal-konto-help668).

Each Payment Link may optionally be given an **Auto-return URL** pointing to `https://0xsl0th.github.io/tonart/handover.html?service=KEY`, with the matching key from the table above. PayPal documents this in the [Payment Links confirmation settings](https://developer.paypal.com/payment-links-buttons/create-payment-link/). This improves the route back after checkout but does not prove payment; the handover and merchant reconciliation remain required. Do not mark Auto-return as configured until the seven links have been edited and checked in PayPal.

## Checkout language

Tonart remembers the visitor's English, Spanish or German selection, but PayPal's hosted Payment Links do not inherit that setting. PayPal says a prior `LANG` cookie can override the browser's language. It documents a checkout-language override only with **both** `locale.x` and `country.x` in the link; that country override also makes PayPal treat every visitor as a buyer from the specified country. Because Tonart serves international buyers, the seven links keep PayPal's automatic buyer-region handling rather than deriving a buyer country from the site's language selector. Merchant-entered product names and descriptions remain in their original language. See [PayPal's Payment Links troubleshooting guide](https://developer.paypal.com/payment-links-buttons/troubleshooting/) and [PayPal Help](https://www.paypal.com/us/cshelp/article/paypal-pay-links-and-button-troubleshooting-tips-ts2341).

## Outstanding merchant and consumer tasks

- Confirm whether Tonart's audio work is classified as a trade or freelance activity and complete the applicable registration. [Berlin service](https://service.berlin.de/dienstleistung/121921/standort/324673/de_plain/) · [BMWK audio-work guidance](https://www.existenzgruendungsportal.de/Redaktion/DE/BMWK-Infopool/Antworten/Gruendungsplanung/Freie-Berufe/ingenieuraehnliche-Taetigkeit/tontechnik-taetigkeit-freiberuflich-oder-gewerblich)
- Review the published operator notice and complete pre-purchase details, including withdrawal information. The customer-service phone and total USD prices are shown. [DDG § 5](https://www.gesetze-im-internet.de/ddg/__5.html) · [EGBGB Art. 246a § 1](https://www.gesetze-im-internet.de/bgbeg/art_246a__1.html)
- Provide a working online withdrawal function with the confirmation and immediate receipt required for online consumer contracts. A static page and mailto link alone do not implement this. [BGB § 356a](https://www.gesetze-im-internet.de/bgb/__356a.html)
- Review the privacy notice and provide a durable contract confirmation before work starts. [GDPR Art. 13](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32016R0679) · [BGB § 312f](https://www.gesetze-im-internet.de/bgb/__312f.html)
- Check the buyer-facing merchant name during a real payment flow and complete an account-holder-controlled test transaction. Until then, successful collection and merchant settlement have not been verified.
