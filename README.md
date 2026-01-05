<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Hackpack — Momentum Engine for Builders

Hackpack is designed to feel like a mini hackathon on demand: authenticate with GitHub, pick a template mission, generate a repo with a motivating README and issues, and ship to a live URL fast. This repo is the web app (React + Vite) with PWA shell support and a scaffold for a future full-stack backend.

## Stack

- React 19 + Vite
- Tailwind (CDN) + custom glassmorphism tokens
- PWA: manifest + service worker app shell
- Icons: lucide-react

## Quickstart

1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Open http://localhost:3000

## Environment (planned backend hooks)

Create `.env.local` with:

```
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_APP_ID=
VERCEL_DEPLOY_HOOK_URL=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

> Note: The current frontend still mocks generation/auth; these keys prepare the project for wiring Octokit + Vercel + Supabase.

## PWA

- Manifest: `public/manifest.webmanifest`
- Service worker: `public/service-worker.js`
- Auto-registered in `index.tsx`. Build/deploy on HTTPS for install prompts.

## Future Backlog (full-stack path)

- GitHub OAuth (PKCE) and Octokit-backed `/api/generate`
- Template repo metadata from GitHub instead of static constants
- Supabase persistence for users/projects/tasks
- Vercel deploy hook integration per template

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview build locally

## License

MIT
