# Hackpack Product Specification

## 1. Problem Statement
Hackathons are won by shipping, not configuring. Developers spend the first 2-4 hours of every hackathon setting up boilerplates, configuring ESLint, fighting Docker, and failing to deploy. **Hackpack** solves this by reducing the "Idea to Hello World URL" time from 4 hours to 4 minutes.

## 2. Core MVP Features
1.  **One-Click Auth:** GitHub OAuth integration.
2.  **Template Library:** 5 curated, "batteries-included" templates (Web, API, Mobile, Data).
3.  **Repo Generator:** Creates a new private repo in user's GitHub using the Template API.
4.  **Smart Scaffolding:** Auto-commits a custom `README.md` and generates GitHub Issues from a checklist.
5.  **Deploy Handoff:** Pre-configured `vercel.json` or `Dockerfile` for immediate deployment.
6.  **Success Dashboard:** Provides immediate links to Repo, Live URL, and Issue board.

## 3. User Flows

### Flow 1: Onboarding
1. User lands on Hero.
2. Clicks "Start Building".
3. Redirects to GitHub OAuth.
4. Returns to Template Selection.

### Flow 2: Generation
1. User selects "Next.js Starter".
2. Inputs: `Project Name` (e.g., "FoodSaver").
3. System checks repo name availability.
4. User clicks "Generate".
5. **System Action:**
   - Calls `POST /repos/{template}/generate`.
   - Modifies `package.json` name.
   - Generates `README.md` via Handlebars.
   - Pushes commit.
   - Triggers Vercel Deploy Hook (mocked for MVP via link).
6. Success Modal appears with Confetti.

## 4. "What to Build First" Checklist (Priority Order)
*Owner assignments assume Team of 2 (Dev A & Dev B)*

1.  **[Dev A] Setup Next.js + Tailwind Skeleton:** Get the hosting and UI shell running.
2.  **[Dev B] GitHub OAuth Service:** Implement `next-auth` or custom Octokit auth flow to get a valid user token.
3.  **[Dev A] Template Repositories:** Create the 5 GitHub repositories that will serve as templates. Make them "Public Templates".
4.  **[Dev B] Generator API (`POST /api/generate`):** Write the Octokit logic to instantiate a repo from a template.
5.  **[Dev B] README Generator Script:** Create the Handlebars template and the script to commit it to the new repo.
6.  **[Dev A] Frontend Form UI:** Build the "Name your project" form and the loading state animations.
7.  **[Dev A] Success State UI:** The "Dopamine" page with links to the new repo.
8.  **[Dev B] Vercel Deploy Link:** Add the "Deploy to Vercel" button logic (using Vercel's deploy hooks or deep links).
9.  **[Shared] Marketing Assets:** Record the demo video and write the "Launch Tweet".
10. **[Shared] Polish:** Add the glassmorphism, transitions, and error handling.

## 5. 2-Week Sprint Plan

### Week 1: Core Mechanics
*   **Mon:** Project Setup, Repo creation, Design System definition (Tailwind tokens).
*   **Tue:** GitHub Auth integration (NextAuth.js).
*   **Wed:** Create the 5 seed Template repositories with CI/CD stubs.
*   **Thu:** Implement `POST /generate` endpoint (GitHub API integration).
*   **Fri:** Implement README generation and file commitment logic.
*   **Sat/Sun:** Basic Frontend (Template list -> Form -> Console Log output).

### Week 2: Polish & Launch
*   **Mon:** Connect Frontend to Backend. Handle errors (Repo exists, Rate limits).
*   **Tue:** Build Success Page (Confetti, Links).
*   **Wed:** Apple-style UI Polish (Glassmorphism, Micro-interactions).
*   **Thu:** QA & Testing (End-to-end flow). Record Demo Video.
*   **Fri:** Write Case Study. Setup Production Database (Supabase).
*   **Sat:** Soft Launch / Submit to Hackathon.
