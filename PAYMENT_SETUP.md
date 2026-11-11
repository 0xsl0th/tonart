# Tonart payment link setup

The site uses a separate PayPal Business account for studio sales. The existing personal PayPal.Me link is not part of checkout. PayPal's [Payment Links guide](https://developer.paypal.com/payment-links-buttons/create-payment-link/) describes creating fixed-price links in **Pay & Get Paid → Create Payment Links and Buttons**.

Create one one-time, fixed-price **USD** link for each offer. Use a service description that matches the scope on `booking.html`.

| `booking.js` key | PayPal service name | USD price |
| --- | --- | ---: |
| `stereo` | Tonart stereo mastering — 1 track | $39 |
| `stem` | Tonart stem mastering — 1 track | $69 |
| `mix` | Tonart mixing — 1 track | $129 |
| `mixmaster` | Tonart mixing + mastering — 1 track | $149 |
| `ep-stereo` | Tonart 3-track EP — stereo mastering | $99 |
| `ep-stem` | Tonart 3-track EP — stem mastering | $179 |
| `ep-mixmaster` | Tonart 3-track EP — mixing + mastering | $399 |

Copy each public `https://www.paypal.com/ncp/payment/…` URL into the matching `PAYMENT_LINKS` entry at the top of `booking.js`. A blank entry keeps that offer on the booking-request path. No password, API key, or account token belongs in this repository.

Before connecting a link, open it as a customer and check the **merchant identity, service name, USD price, any tax or fee, and available payment methods**. PayPal's guide also recommends a sandbox payment or a low-value live transaction to verify that payment appears in the merchant dashboard. Only the account holder should perform a live test payment.

The site does not receive PayPal webhooks or verify payments. The customer sends a project brief with their PayPal transaction ID. The studio must find the completed transaction in PayPal and match it to the brief and service before confirming work. The first-preview clock starts after payment, project scope, and usable files are confirmed. A return to this site from PayPal is not proof of payment.
