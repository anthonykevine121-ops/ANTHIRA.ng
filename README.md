<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# ANTHIRA

## Local development

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Copy [.env.example](.env.example) to `.env.local` and set the Supabase URL and publishable key.
3. Start the Next.js development server:
   `npm run dev`

Production builds use `npm run build` and `npm start`. Vercel can deploy this project using its Next.js preset.

## Authentication and verified customers

Authentication is powered by Supabase. Create a Supabase project and configure
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local` for local
development and as Vercel environment variables for production. These are public
client values. Never put a secret/service-role key in a `NEXT_PUBLIC_` variable.

Before deploying:

1. Apply `supabase/migrations/20261020120000_verified_customer_profiles.sql`
   to the Supabase project (for example, with the Supabase SQL Editor).
2. In Supabase Authentication settings, enable email confirmations and configure
   the Confirm signup email template to display the OTP token with `{{ .Token }}`.
   Sign-up requires the user to enter that email code before they are signed in.
3. Add the local and production URLs to Supabase Authentication's allowed URLs.
4. To grant backend access, set the trusted administrator's `app_metadata` to
   `{"role":"admin"}` using the Supabase dashboard or a trusted server-side
   admin tool. Never let a user set their own `app_metadata`.

Verified accounts are synced to `public.profiles`; the admin Customers view reads
verified profiles under row-level security. Unverified accounts are not listed.
