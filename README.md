# Tonart

A static website for Tonart, an online mixing, mastering and music production studio. The homepage, booking, project handover and legal pages are available in English, Spanish and German. There is no build step or JavaScript package dependency.

Live site: https://tonart.space/

## Pricing and booking

Launch rates are US$39 stereo mastering, US$69 stem mastering, US$129 mixing and US$149 mixing plus mastering. EPs contain 4–6 tracks. EP pricing scales the previous three-track bundle rates by track count (rounded to the nearest dollar): stereo mastering is US$132 / US$165 / US$198, stem mastering is US$239 / US$298 / US$358, and mixing plus mastering is US$532 / US$665 / US$798 for 4 / 5 / 6 tracks respectively. Production remains quote-based. Individual mastering aims for a first preview in 3–5 business days; mixing in 7–10 business days. The clock begins after payment, the brief and usable final files are confirmed. EP timing is agreed after file review.

`booking.html` explains each package and opens its fixed-price PayPal checkout. EP visitors choose 4, 5 or 6 tracks and see the corresponding price and payment link. Each connected PayPal link returns the buyer to `handover.html` with the selected service after successful checkout; the same page is also reachable from booking and the homepage. The handover asks for the selected service and payment method, contact and receipt details, artist and track title, and a private downloadable link to the audio and project files. It prepares an email to `tonart.space@gmail.com`; the customer must send that email from their mail app. A copy option helps when no mail app is configured. The static site does not receive form submissions or upload files. The studio checks the payment account and usable files before confirming a booking; a browser return cannot prove payment completed.

For customers paying in Argentina, the booking page shows ARS amounts from the dated DolarHoy **dólar blue venta** rate. The Mercado Pago link amount is the selected USD price converted to ARS plus 10%; a direct transfer to the studio operator's Mercado Pago account uses the base conversion. Both are rounded to whole pesos. The receiving transfer alias and amount-free Mercado Pago link are public; customers enter or transfer the displayed amount while the rate is current. If the saved rate is more than 24 hours old, the page falls back to an ARS quote request. The handover records the selected method and payment reference; the studio verifies the credited ARS amount in Mercado Pago before confirming the project. A transfer is separate from Mercado Pago's hosted checkout.

The [ARS rate refresh workflow](.github/workflows/refresh-ars-rate.yml) checks DolarHoy at 11:00 and 22:00 Buenos Aires time and republishes a valid source update. Its [parser](scripts/refresh-ars-rate.mjs) stops on missing, implausible, stale or sharply changed data; the booking page then falls back to quote requests when its saved rate expires.

Thirteen fixed-price USD PayPal Business Payment Links are connected to checkout: four for individual tracks and nine for EPs. Three older links for three-track EPs remain in PayPal but are disconnected from new bookings; their original return URLs still identify prior purchases in the handover form. The supplied German Personal PayPal.Me link is not used. The PayPal checkout URL validator accepts only `https://paypal.com/ncp/payment/…` links. `CHECKOUT_ENABLED` in `booking.js` can pause public checkout. The [payment setup notes](PAYMENT_SETUP.md) track the merchant workflow and outstanding launch requirements. Never put a payment password or API secret in this static repository.

The exact offer names, prices and verification steps are in [PAYMENT_SETUP.md](PAYMENT_SETUP.md).

The language selector saves a visitor's choice in `localStorage` across the site. Without a saved choice, the site uses German or Spanish when that is the browser's primary language, and English otherwise. PayPal's hosted checkout chooses its own language from PayPal and browser settings, so it may differ from the site; see [payment setup notes](PAYMENT_SETUP.md#checkout-language).

## Preview locally

Run `python3 -m http.server 8000` in this directory, then open `http://localhost:8000`.

## Publish with GitHub Pages

The site is designed to publish from the `main` branch root. In the repository settings, set **Pages → Build and deployment → Deploy from a branch → main / (root)**. Relative CSS, JavaScript and icon paths work both locally and at the GitHub Pages project URL.

## Operations notes

- Project enquiries use tonart.space@gmail.com, with [Murlek's Instagram](https://www.instagram.com/murlek.mrlk/) as another contact route.
- Recheck launch prices and delivery times with the studio when changing offers. Audio samples, testimonials and client credits need publication permission.
- `tonart.space` is the configured GitHub Pages custom domain. Keep the `CNAME`, DNS, canonical URL, social URLs and sitemap aligned with it.
- If a track comparison or studio photography is added later, confirm permission to publish the audio and images.

## Files

- `index.html` — content and page structure
- `styles.css` — visual design and responsive layouts
- `app.js` — English/Spanish/German selection and mobile menu
- `booking.html`, `booking.css`, `booking.js` — package selection and booking instructions
- `handover.html`, `handover.css`, `handover.js` — post-payment project handover and email preparation
- `impressum.html`, `impressum.css`, `impressum.js` — localized operator and contact notice
- `assets/` — favicon and social sharing image
