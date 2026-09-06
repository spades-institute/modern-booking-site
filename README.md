# AB ~ Cuts — Abuja Barber & Grooming

A monochrome, one-page marketing site for an Abuja-based barber offering
in-studio and at-home appointments. Built with Next.js 14 (App Router),
Tailwind CSS, and plain JS/JSX — no TypeScript, no UI kit, no CMS required.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production build:

```bash
npm run build
npm start
```

> Note: `next/font` pulls Fraunces, Inter, and Space Mono from Google Fonts
> at build time, so the machine you build on needs normal internet access.

## What's inside

- **Design system**: colors, type, and spacing tokens live in
  `tailwind.config.js` (`ink`, `stone`, `paper`) and `app/globals.css`.
  Everything is grayscale by design — no color accent — with a black-to-white
  "fade" gradient (`FadeDivider.jsx`) as the one recurring signature motif,
  a nod to an actual skin fade haircut.
- **Sections** (`components/`): `Nav`, `Hero`, `Trust` (stats + studio blurb),
  `Services` (in-studio/at-home pricing toggle), `HowItWorks`, `Gallery`,
  `Booking` (booking + inquiry form, tabbed), `FAQ`, `Footer`.
- **Booking flow**: `Booking.jsx` posts JSON to `/api/booking` or
  `/api/inquiry`. Both routes (`app/api/*/route.js`) validate the payload and
  currently just `console.log` it — wire in real delivery before going live
  (see below).
- **Icons**: hand-set inline SVGs in `components/Icons.jsx`, no icon package
  dependency.

## Before you launch

1. **Connect the booking form to something real.** Right now `route.js` in
   both API folders logs the submission and returns success. Swap the
   `TODO` for one (or more) of:
   - Email via [Resend](https://resend.com) or `nodemailer`
   - A WhatsApp Business API call, since the copy promises WhatsApp
     confirmation
   - A row written to a database, Airtable, or Google Sheet
2. **Replace placeholder content.**
   - Phone, email, and service area details in `Nav.jsx`, `Booking.jsx`, and
     `Footer.jsx`
   - Service list and prices in `Services.jsx` and `Booking.jsx`
   - Hours in `Booking.jsx` and `Footer.jsx`
   - Social links in `Footer.jsx`
3. **Swap the photography.** `Hero.jsx` and `Gallery.jsx` currently pull
   placeholder shots from Unsplash (grayscale-filtered via CSS). Replace the
   `src` values with real photos of the barber's own work — drop files into
   `public/` and reference them as `/your-file.jpg`, or use `next/image`
   for automatic optimization.
4. **Add a real map** to the Footer or a dedicated location block if the
   studio address should be pinpointed (Google Maps embed or a static image).
5. **Currency**: pricing has been updated to NGN for Abuja market rates, with
   a small logistics allowance factored into home visits.

## Structure

```
app/
  layout.js         Fonts + global metadata
  page.js            Assembles all sections
  globals.css        Tokens, resets, reduced-motion handling
  api/booking/route.js
  api/inquiry/route.js
components/
  Nav.jsx            Fixed header + full-screen mobile menu
  Hero.jsx
  Trust.jsx          Stats strip + "the studio" blurb
  Services.jsx        Pricing list with in-studio/at-home toggle
  HowItWorks.jsx
  Gallery.jsx
  Booking.jsx         Booking/inquiry tabbed form
  FAQ.jsx             Accordion
  Footer.jsx
  Icons.jsx           Inline SVG icon set
  FadeDivider.jsx     Signature gradient divider
```

## Accessibility & responsiveness

- Visible focus rings on every interactive element
- `prefers-reduced-motion` respected (animations/scroll-behavior disabled)
- Mobile nav is a full-screen overlay with a trapped scroll and large tap
  targets; desktop nav is inline with underline-on-hover links
- Layout is tested down to small phone widths (two-column stat/gallery grids
  collapse, forms stack to one column)
