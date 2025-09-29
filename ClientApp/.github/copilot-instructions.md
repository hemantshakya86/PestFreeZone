## Quick orientation

This is an Angular 16 single-page application (PestFreeZone UI). Key facts an automated coding agent should know before editing:

- Project root: `src/` contains the Angular app. The runtime entry is `src/main.ts` and the app module is `src/app/app.module.ts`.
- CLI metadata and builds are driven by `angular.json`. The dev server (default) is `ng serve` / `npm start` which serves at http://localhost:4200.
- Build output: `ng build` -> `dist/pest-free-zone-ui` (see `angular.json` -> `projects.PestFreeZoneUI.architect.build.options.outputPath`).

## Big-picture architecture

- AppModule (`src/app/app.module.ts`) is the root module. It imports `AppRoutingModule` and registers `HttpClientModule`.
- Routing (`src/app/app-routing.module.ts`) defines main routes and lazy-loads the admin area:
  - Regular routes: `home`, `services`, `blog`, `about`, `contact` (component-per-folder under `src/app/`).
  - Admin is lazy-loaded: `loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)`.
- Routing uses HashLocationStrategy (see `providers` in `AppModule`). Expect URLs with `#/` (important for hosting on IIS / static servers).
- Services live under `src/app/core/services` and models under `src/app/core/models`. Services use Angular `HttpClient` and are typically `providedIn: 'root'`.

Example to inspect: `src/app/core/services/content.service.ts` — it calls `https://localhost:7288/content`. Verify backend host/port before changing API URLs.

## Conventions and patterns (project-specific)

- Component layout: each component folder contains `*.component.ts`, `*.component.html`, `*.component.css`, and `*.component.spec.ts`.
- Services: keep them in `core/services`. Prefer `providedIn: 'root'` unless a narrower scope is required.
- Models: place plain TypeScript interfaces/classes in `core/models` and use them as generics for `HttpClient` calls (see `ContentPageModel`).
- Assets: static CSS, JS and images are under `src/assets/*` and are explicitly declared in `angular.json`.
- Do not remove the `HashLocationStrategy` provider unless you verify server rewrite rules (there is a `web.config` in the project root which suggests IIS hosting expectations).

## Developer workflows (commands)

Install and start dev server (PowerShell):

```powershell
npm install
npm start
```

Build (production):

```powershell
npm run build
# output -> dist/pest-free-zone-ui
```

Run unit tests (Karma/Jasmine):

```powershell
npm test
```

Notes: `npm start` runs `ng serve` (development configuration by default). The default production configuration is set in `angular.json` (see `defaultConfiguration`).

## Integration points and external dependencies

- Backend API: many services point to an API on `https://localhost:7288` (example: `ContentService`). Confirm CORS and certificate trust when testing locally.
- Hosting: `web.config` indicates an expectation of IIS/Windows hosting; routes rely on hash strategy rather than server rewrites.
- No external auth library was detected in the front-end; if adding auth, follow the existing `HttpClient` patterns and centralize token handling in a single service under `core/services`.

## Safe edit checklist for AI code changes

1. If editing routes, update `src/app/app-routing.module.ts` and keep `HashLocationStrategy` intent in mind.
2. When adding services, add them under `src/app/core/services` and use `providedIn: 'root'` unless explicitly limited.
3. When changing API URLs, search `src/app/core/services` for the base URL(s) and prefer a single configuration point (no central env file exists in this repo — raise a PR to add one if needed).
4. When touching styling, update `src/assets/css` if it’s global; component styles belong next to the component.
5. Run `npm test` after any behavioral change that has specs; unit tests use Karma/Jasmine.

## Files to inspect for context (quick links)

- `src/app/app.module.ts` (root module, providers)
- `src/app/app-routing.module.ts` (routing and lazy-loading)
- `src/app/admin/admin.module.ts` (lazy module example)
- `src/app/core/services/content.service.ts` (HTTP patterns and backend host)
- `angular.json` (build/asset configuration)
- `package.json` (npm scripts)

## When you need human help

- If you encounter missing backend endpoints, CORS or TLS errors: ask the backend owner or run the backend locally on `https://localhost:7288`.
- If a large refactor is required (introducing environment files, switching to PathLocationStrategy, adding a global state management library), outline the change and request approval — these affect hosting and routing.

---

If any of these sections are unclear or you want examples added (for instance sample test edits or a suggested environment file), tell me which area to expand and I'll update this file.
