# Sun Power Solar

Product showcase website and admin panel for Sun Power Solar.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Postgres + Storage) · Vercel

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, featured products, why choose us, about, promotion, contact CTA |
| `/products` | Product catalogue with category filter and search |
| `/products/[slug]` | Product details — gallery, videos, features, specifications, documents |
| `/about` | Company profile, mission, vision, services |
| `/contact` | Contact details and enquiry form |
| `/admin` | Admin dashboard (login required) |

Admin: `/admin/login` → products (add / edit / delete), announcements, enquiries.

## Running locally

Requires **Node 22 or newer** (the Supabase client needs native WebSocket support, which Node 20
does not have). With nvm: `nvm use` picks up the version from `.nvmrc`.

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev                  # http://localhost:3000
```

Without Supabase keys the site runs in **demo mode**: it serves the sample catalogue in
`lib/seed-data.ts` so you can browse everything, but the admin panel cannot save changes.

## Connecting Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**, paste the contents of `supabase/schema.sql` and run it.
   This creates the tables, row-level security policies and the public `media` storage bucket.
3. Copy the keys from **Project Settings → API** into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-side only — never expose this publicly)
4. Set your admin login in the same file: `ADMIN_EMAIL`, `ADMIN_PASSWORD` and a random
   `ADMIN_SESSION_SECRET` (generate with `openssl rand -base64 32`).
5. Restart the dev server, sign in at `/admin/login` and add your products.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework is detected automatically.
3. Add the five environment variables from `.env.local` in **Settings → Environment Variables**.
4. Deploy. Every push to `main` redeploys automatically.

## Editing company details

Phone, email, address, WhatsApp, social links, currency and the headline statistics live in
`lib/site.ts`. Change them there and redeploy — no database work needed.

## Product content

Products are managed from the admin panel. A few fields use simple line-based formats:

- **Images / videos** — one URL per line (use the upload button to add files to Supabase Storage)
- **Features** — one feature per line
- **Specifications** — one per line as `Label: Value`
- **Documents** — one per line as `Datasheet (PDF) | https://.../file.pdf`

Placeholder photography in `public/images` is AI-generated and should be replaced with real
product photos before launch.
