<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/8976ddfd-7c9c-4371-8513-393ee926f4aa

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Authentication and verified customers

Authentication is powered by Supabase. Create a Supabase project and configure
`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local` for local
development and as Vercel environment variables for production. Do not put a
service-role key in the browser or in a `VITE_` variable.

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
