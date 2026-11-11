# Tonart

A bilingual, static website for Tonart, an online mixing, mastering and music production studio. It has no build step or JavaScript package dependencies.

## Launch pricing and booking draft

The draft adds launch rates of US$39 stereo mastering, US$69 stem mastering, US$129 mixing and US$149 mixing plus mastering. Three-track EP offers are US$99, US$179 and US$399 respectively. Production remains quote-based. Individual mastering aims for a first preview in 3–5 business days; mixing in 7–10 business days. The clock begins after payment, the brief and usable final files are confirmed. EP timing is agreed after file review.

`booking.html` explains each package and creates a project brief the customer can email to Tonart or send to Murlek on Instagram. It does not collect payment information or upload files. When checkout is enabled, the customer pays through PayPal, then sends the project brief, private file link and buyer transaction ID. The studio checks PayPal Activity and the usable files before confirming a booking; a browser return cannot prove payment completed.

Seven fixed-price USD PayPal Business Payment Links are staged in this branch, but `CHECKOUT_ENABLED` in `booking.js` remains `false`; visitors use the booking-request path. They are not yet on the published `main` site. The supplied German Personal PayPal.Me link is not used. The page accepts only `https://paypal.com/ncp/payment/…` links. Before enabling live checkout, settle the operator's trade/tax status and complete the required consumer information, withdrawal process, and transaction confirmation workflow. The [payment setup notes](PAYMENT_SETUP.md) track the remaining items. Never put a PayPal password or API secret in this static repository.

The exact offer names, prices and verification steps are in [PAYMENT_SETUP.md](PAYMENT_SETUP.md).

## Preview locally

Run `python3 -m http.server 8000` in this directory, then open `http://localhost:8000`.

## Publish with GitHub Pages

The site is designed to publish from the `main` branch root. In the repository settings, set **Pages → Build and deployment → Deploy from a branch → main / (root)**. Relative CSS, JavaScript and icon paths work both locally and at the GitHub Pages project URL.

## Before launch

- Project enquiries currently link to [Murlek's Instagram](https://www.instagram.com/murlek.mrlk/). Replace the contact link in `index.html` when Tonart has its own inbox or booking flow.
- The launch prices and delivery times are included in this draft. Recheck them with the studio before accepting payment. Audio samples, testimonials and client credits still need publication permission.
- `tonart.space` is a candidate domain only. Buy it and configure DNS before adding a `CNAME` file or changing the canonical and social URLs in `index.html`.
- If a track comparison or studio photography is added later, confirm permission to publish the audio and images.

## Files

- `index.html` — content and page structure
- `styles.css` — visual design and responsive layouts
- `app.js` — English/Spanish toggle and mobile menu
- `booking.html`, `booking.css`, `booking.js` — package selection and booking instructions
- `assets/` — favicon and social sharing image
