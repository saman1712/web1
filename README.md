# ویژن — منوی کافه

Pixel-close recreation of the [BOOK ZONE (شعبه فرشته)](https://bookzonef.menusaz.com/) digital menu, rebranded to **ویژن**.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Ready to deploy on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Deploy to Vercel

**CLI**

```bash
npm i -g vercel
vercel
```

**Dashboard**

1. Push this repo to GitHub / GitLab / Bitbucket.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Framework preset: Next.js (auto-detected). No extra server or `vercel.json` is required.
4. Optional env: `NEXT_PUBLIC_SITE_URL` (see `.env.example`) so Open Graph URLs are absolute.

## Name replacements

| Original | New |
| --- | --- |
| BOOK ZONE | ویژن |
| BOOK ZONE (شعبه فرشته) | ویژن (شعبه فرشته) |
| bookzone.tehran | vizhen.tehran |
| Espresso / zone special | Espresso / ویژن special |
| Long Black / zone special | Long Black / ویژن special |
| Iced Americano (zone special) | Iced Americano (ویژن special) |

All other copy, prices, photos, icons, and layout are unchanged.

## Logo

The original mark is an image (`BOOK` / `ZONE` stacked, red **O**). That file contains the old name, so it is replaced with a text logo in the same stacked style (red accent on **ژ**). Drop a designed SVG/PNG into `components/logo.tsx` when a final asset is ready.

## Approximations

- **Font:** the source site uses commercial IranYekan. This project uses [Vazirmatn](https://fonts.google.com/specimen/Vazirmatn) (Google Fonts) at matching weights.
- **Ordering / SMS login / waiter pager backend:** the original live site disables ordering (`order_null.js`) and talks to Menusaz PHP endpoints. Rating is handled by `POST /api/rate` (validates and acknowledges; no external SMS).
- **Hero video, food photos, category icons, and UI chrome** are local copies under `public/media` and `public/ui`.
