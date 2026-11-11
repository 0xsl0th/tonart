# Tonart

A static website for Tonart, an online mixing, mastering and music production studio. The homepage, booking, project handover and legal pages are available in English, Spanish and German. There is no build step or JavaScript package dependency.

Live site: https://0xsl0th.github.io/tonart/

## Pricing and booking

Launch rates are US$39 stereo mastering, US$69 stem mastering, US$129 mixing and US$149 mixing plus mastering. Three-track EP offers are US$99, US$179 and US$399 respectively. Production remains quote-based. Individual mastering aims for a first preview in 3–5 business days; mixing in 7–10 business days. The clock begins after payment, the brief and usable final files are confirmed. EP timing is agreed after file review.

`booking.html` explains each package and opens its fixed-price PayPal checkout. Each PayPal link is configured to return the buyer to `handover.html` with the selected service after successful checkout; the same page is also reachable from booking and the homepage. The handover asks for the selected service, contact and payment/receipt email, artist and track title, an optional buyer transaction ID, and a private downloadable link to the audio and project files. It prepares an email to `tonart.space@gmail.com`; the customer must send that email from their mail app. A copy option helps when no mail app is configured. The static site does not receive form submissions or upload files. The studio checks PayPal Activity and the usable files before confirming a booking; a browser return cannot prove payment completed.

Seven fixed-price USD PayPal Business Payment Links are connected to checkout. The supplied German Personal PayPal.Me link is not used. The page accepts only `https://paypal.com/ncp/payment/…` links. `CHECKOUT_ENABLED` in `booking.js` can pause public checkout. The [payment setup notes](PAYMENT_SETUP.md) track the merchant workflow and outstanding launch requirements. Never put a PayPal password or API secret in this static repository.

The exact offer names, prices and verification steps are in [PAYMENT_SETUP.md](PAYMENT_SETUP.md).

The language selector saves a visitor's choice in `localStorage` across the site. Without a saved choice, the site uses German or Spanish when that is the browser's primary language, and English otherwise. PayPal's hosted checkout chooses its own language from PayPal and browser settings, so it may differ from the site; see [payment setup notes](PAYMENT_SETUP.md#checkout-language).

## Preview locally

Run `python3 -m http.server 8000` in this directory, then open `http://localhost:8000`.

## Publish with GitHub Pages

The site is designed to publish from the `main` branch root. In the repository settings, set **Pages → Build and deployment → Deploy from a branch → main / (root)**. Relative CSS, JavaScript and icon paths work both locally and at the GitHub Pages project URL.

## Operations notes

- Project enquiries use tonart.space@gmail.com, with [Murlek's Instagram](https://www.instagram.com/murlek.mrlk/) as another contact route.
- Recheck launch prices and delivery times with the studio when changing offers. Audio samples, testimonials and client credits need publication permission.
- `tonart.space` is a candidate domain only. Buy it and configure DNS before adding a `CNAME` file or changing the canonical and social URLs in `index.html`.
- If a track comparison or studio photography is added later, confirm permission to publish the audio and images.

## Files

- `index.html` — content and page structure
- `styles.css` — visual design and responsive layouts
- `app.js` — English/Spanish/German selection and mobile menu
- `booking.html`, `booking.css`, `booking.js` — package selection and booking instructions
- `handover.html`, `handover.css`, `handover.js` — post-payment project handover and email preparation
- `impressum.html`, `impressum.css`, `impressum.js` — localized operator and contact notice
- `assets/` — favicon and social sharing image
