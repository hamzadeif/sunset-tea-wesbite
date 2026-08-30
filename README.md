# Sunset Tea Website

Polished multi-page marketing site for Sunset Tea — boba, matcha, catering, and pop-ups.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Resend for catering inquiry emails
- Vercel-ready

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
```

## Business configuration

Edit these files when pricing, menu, or copy changes:

| File | Purpose |
|------|---------|
| `src/lib/config/business.ts` | Prices, fees, response time |
| `src/lib/config/menu.ts` | Drinks, toppings, crowd favorites |
| `src/lib/config/packages.ts` | Package features & CTAs |
| `src/lib/config/faq.ts` | FAQ answers |
| `src/lib/config/events.ts` | Pop-up / event gallery entries |
| `src/lib/config/site.ts` | Site name, social, contact |

## Email (Resend)

1. Create a free account at [resend.com](https://resend.com)
2. Copy `.env.example` → `.env.local`
3. Set `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, and `INQUIRY_FROM_EMAIL`
4. For production, verify your domain in Resend and use a from-address on that domain

The app builds and runs without these vars. Inquiries are accepted and logged server-side until email is configured.

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project in [vercel.com/new](https://vercel.com/new)
3. Add the same env vars under Project → Settings → Environment Variables
4. Deploy

## Images

- Logo: `public/images/sunset-tea-logo.png`
- Drink / event photos: currently intentional placeholders — swap via components or add paths in `src/lib/config/events.ts`
