# AGENTS.md — photo-booth-admin-portal

KeptScene admin portal (internal tool): manage photo frames, photo processing results, and coupons. Own repo (`github.com/tanpochara/photo-booth-admin-portal`, deploy on Vercel). Sibling repos live next to it — backend conventions are in `/home/tan/photobooth/AGENTS.md` and `photo-booth-backend/CLAUDE.md`. Quirk: `package.json` still says `"name": "photo-booth-frontend"` (this repo was forked from the mobile app) — don't be confused by it.

## Commands (pnpm@9.15.3)

- `pnpm dev` — Vite dev server. No API proxy is configured, so requests go straight to `VITE_API_BASE_URL`.
- `pnpm build` — `tsc -b && vite build`. This is the only typecheck; there is no separate typecheck script.
- `pnpm lint` — `eslint .` (flat config). No prettier.
- `pnpm generate:client` — regenerates `src/api/` (openapi-typescript-codegen, axios) from the backend's OpenAPI JSON. Needs the backend running: `cd ../photo-booth-backend && pnpm run start:api:dev` (serves `http://localhost:8080/api-json`).
- No tests and no CI exist in this repo.

## Critical gotchas

- `src/api/` is generated code — except `src/api/core/OpenAPI.ts`, which is hand-wired and gets **overwritten by `pnpm generate:client`**. After regenerating, re-apply:
  - `BASE: import.meta.env.VITE_API_BASE_URL ?? ''`
  - `HEADERS: { 'x-admin-api-key': import.meta.env.VITE_ADMIN_API_KEY ?? '' }`
- Backend Swagger declares `x-admin-api-key` as a header param on admin endpoints, so generated services take it as an explicit first argument (e.g. `PhotosService.photosControllerGetPhotoResults(apiKey, body)`). Hooks read `import.meta.env.VITE_ADMIN_API_KEY` and pass it through — keep it in sync with the backend's `ADMIN_API_KEY` env.
- The backend has no global API prefix: generated service paths are root-relative (`/photos/results`), so `VITE_API_BASE_URL` is an origin like `http://localhost:8080` (no `/api` suffix). Backend CORS allows all origins.
- `.env` is gitignored with no `.env.example`. Dev needs `VITE_API_BASE_URL` and `VITE_ADMIN_API_KEY`. The admin key is embedded in the client bundle by design (shared-key guard on an internal tool) — don't try to move it server-side.
- `VITE_GA_MEASUREMENT_ID` appears only in a stale comment in `src/main.tsx`; react-ga4 is installed but never initialized.

## Architecture

- React 19 + Vite 7 + strict TS (project refs: `tsconfig.app.json` / `tsconfig.node.json`). Tailwind v4 via `@tailwindcss/vite` — no `tailwind.config.*`; theme is CSS variables in `src/index.css`.
- Path alias `@/*` → `./src/*` (in `tsconfig` and `vite.config.ts`).
- shadcn/ui (new-york style, lucide icons). `src/components/ui/` is vendored shadcn code — editing it is expected; add primitives with `pnpm dlx shadcn@latest add <component>`.
- Routing: react-router 7 `createBrowserRouter` in `src/routes/App.tsx`. Routes: `/` (frames list), `/frame/:frameId` (frame editor), `/search-result` (payment/photo results), `/coupons`.
- `src/routes/Layout.tsx` owns the single `QueryClient`/`QueryClientProvider`, the sonner `Toaster`, and the nav — pages are already inside Query context.
- Data flow: `Pages/` + `components/` → hooks in `src/hooks/api/` (one React Query hook per backend endpoint) → generated `src/api` services. Never call `*Service` directly from components.
- Global state: zustand — `src/lib/store/frameStore.tsx` (frames + selectedFrame).
- Frame editor is `src/Pages/frame-detail/`: `OverviewTab`, `CoordinatesTab`, `AssetsTab`, plus `buildAssets.ts` and `types.ts` (`FrameAssetLabel` union: sample image / frame / gif frame / overlay / filter).

## Cross-repo contract flow

Backend Swagger is the source of truth: backend DTO/controller change → backend `pnpm run start:api:dev` → here `pnpm generate:client` → re-apply the `OpenAPI.ts` env wiring above → add/adjust the hook in `src/hooks/api/` → wire into Pages.
