# Tonart

A bilingual, static website for Tonart, an online mixing, mastering and music production studio. It has no build step or third-party runtime dependencies.

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
- `assets/` — favicon and social sharing image
