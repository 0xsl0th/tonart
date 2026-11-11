# Tonart

A bilingual, static website for Tonart, an online mixing, mastering and music production studio. It has no build step or JavaScript package dependencies.

## Launch pricing and booking draft

The draft adds launch rates of US$39 stereo mastering, US$69 stem mastering, US$129 mixing and US$149 mixing plus mastering. Three-track EP offers are US$99, US$179 and US$399 respectively. Production remains quote-based. Individual mastering aims for a first preview in 3–5 business days; mixing in 7–10 business days. The clock begins after payment, the brief and usable final files are confirmed. EP timing is agreed after file review.

`booking.html` explains each package, creates a project brief the customer can copy into an Instagram message, and contains draft refund and privacy text. It does not collect payment information or upload files. A return from PayPal cannot prove that a payment completed; the studio must verify payment in PayPal before confirming a booking.

The PayPal button is currently **disabled** in `booking.js` (`PAYMENTS_ENABLED = false`). The supplied PayPal.Me handle is configured there, but the link's classification for commercial goods-and-services payments has not been confirmed. Before enabling checkout, confirm that classification in PayPal or with PayPal support, review the published package scope and policies with the studio, and then set `PAYMENTS_ENABLED = true`. For a longer-term checkout, replace PayPal.Me with product-specific PayPal Business Payment Links. Never put a PayPal password or API secret in this static repository.

## Preview locally

Run `python3 -m http.server 8000` in this directory, then open `http://localhost:8000`.

## Publish with GitHub Pages

The site is designed to publish from the `main` branch root. In the repository settings, set **Pages → Build and deployment → Deploy from a branch → main / (root)**. Relative CSS, JavaScript and icon paths work both locally and at the GitHub Pages project URL.

## Before launch

- Project enquiries currently link to [Murlek's Instagram](https://www.instagram.com/murlek.mrlk/). Replace the contact link in `index.html` when Tonart has its own inbox or booking flow.
- No pricing, delivery times, audio samples, testimonials, or client credits are published because none have been approved or supplied.
- `tonart.space` is a candidate domain only. Buy it and configure DNS before adding a `CNAME` file or changing the canonical and social URLs in `index.html`.
- If a track comparison or studio photography is added later, confirm permission to publish the audio and images.

## Files

- `index.html` — content and page structure
- `styles.css` — visual design and responsive layouts
- `app.js` — English/Spanish toggle and mobile menu
- `booking.html`, `booking.css`, `booking.js` — package selection and booking instructions
- `assets/` — favicon and social sharing image
