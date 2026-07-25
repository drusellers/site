# Conversion Plan: Next.js 16 -> TanStack Start

Status: implemented in this branch. This historical plan targeted TanStack Start React with Vite, TanStack Router file routes, Tailwind CSS v4 via the Vite plugin, and Netlify deployment.

## Goals

- Preserve the current URLs, content model, visual design, dark mode behavior, and SEO/social metadata.
- Keep `/content` as the source of truth for Markdown/YAML content.
- Keep static prerendering for public content pages where possible.
- Remove Next.js-specific APIs and build tooling.
- Use TanStack Start's server functions/loaders for filesystem-backed content.
- Use Vite + `@tailwindcss/vite`, so PostCSS is no longer needed for Tailwind in this project.

## Non-goals for the first migration

- Do not redesign the site.
- Do not rewrite the CMS/content parsing layer unless required by bundling/deployment.
- Do not adopt TanStack Start RSC mode initially; migrate to standard Start + loaders/server functions first.
- Do not change content slugs or permalink structure.

## Current inventory

### Main framework-specific dependencies

- `next`
- `next-themes`
- `next/font/*`
- `next/image`
- `next/link`
- `next/navigation`
- `next/headers`
- `next/server`
- Next metadata APIs: `Metadata`, `ResolvingMetadata`, `generateMetadata`, `metadata`
- Next static APIs: `generateStaticParams`

### Current route groups

Next route groups are not URL segments. TanStack Router should model these as pathless layout routes.

- `(oxford)` = main site shell with sidebar + footer.
- `(design-system)` = design system shell with its own sidebar.
- `/unfurl` = standalone utility page.

### URLs to preserve

| URL | Current file | TanStack route target |
| --- | --- | --- |
| `/` | `app/(oxford)/page.tsx` | `src/app/_oxford/index.tsx` |
| `/about` | `app/(oxford)/about/page.tsx` | `src/app/_oxford/about.tsx` |
| `/allegory` | `app/(oxford)/allegory/page.tsx` | `src/app/_oxford/allegory.tsx` |
| `/atx` | `app/(oxford)/atx/page.tsx` | `src/app/_oxford/atx.tsx` |
| `/code` | `app/(oxford)/code/page.tsx` | `src/app/_oxford/code.tsx` |
| `/iron` | `app/(oxford)/iron/page.tsx` | `src/app/_oxford/iron.tsx` |
| `/media` | `app/(oxford)/media/page.tsx` | `src/app/_oxford/media.tsx` |
| `/posts` | `app/(oxford)/posts/page.tsx` | `src/app/_oxford/posts/index.tsx` |
| `/posts/:id` | `app/(oxford)/posts/[id]/page.tsx` | `src/app/_oxford/posts/$id.tsx` |
| `/quotes` | `app/(oxford)/quotes/page.tsx` | `src/app/_oxford/quotes/index.tsx` |
| `/quotes/:id` | `app/(oxford)/quotes/[id]/page.tsx` | `src/app/_oxford/quotes/$id.tsx` |
| `/readme` | `app/(oxford)/readme/page.tsx` | `src/app/_oxford/readme.tsx` |
| `/resume` | `app/(oxford)/resume/page.tsx` | `src/app/_oxford/resume.tsx` |
| `/stack` | `app/(oxford)/stack/page.tsx` | `src/app/_oxford/stack.tsx` |
| `/style` | `app/(oxford)/style/page.tsx` | `src/app/_oxford/style.tsx` |
| `/tags` | `app/(oxford)/tags/page.tsx` | `src/app/_oxford/tags/index.tsx` |
| `/tags/:id` | `app/(oxford)/tags/[id]/page.tsx` | `src/app/_oxford/tags/$id.tsx` |
| `/values` | `app/(oxford)/values/page.tsx` | `src/app/_oxford/values/index.tsx` |
| `/values/:id` | `app/(oxford)/values/[id]/page.tsx` | `src/app/_oxford/values/$id.tsx` |
| `/text/:id` | `app/(oxford)/text/[id]/route.ts` | `src/app/text/$id.ts` server route |
| `/design-system` | `app/(design-system)/design-system/page.tsx` | `src/app/_design-system/design-system/index.tsx` |
| `/design-system/colors` | `app/(design-system)/design-system/colors/page.tsx` | `src/app/_design-system/design-system/colors.tsx` |
| `/design-system/components` | `app/(design-system)/design-system/components/page.tsx` | `src/app/_design-system/design-system/components.tsx` |
| `/design-system/fonts` | `app/(design-system)/design-system/fonts/page.tsx` | `src/app/_design-system/design-system/fonts.tsx` |
| `/design-system/typography` | `app/(design-system)/design-system/typography/page.tsx` | `src/app/_design-system/design-system/typography.tsx` |
| `/unfurl` | `app/unfurl/page.tsx` | `src/app/unfurl.tsx` |

## Target architecture

Use a new `src/app` Start route directory first. This avoids immediately clobbering the existing root `app` directory during migration.

```txt
src/
  app/
    __root.tsx
    _oxford.tsx
    _oxford/
      index.tsx
      about.tsx
      posts/
        index.tsx
        $id.tsx
      ...
    _design-system.tsx
    _design-system/
      design-system/
        index.tsx
        colors.tsx
        components.tsx
        fonts.tsx
        typography.tsx
    text/
      $id.ts
    unfurl.tsx
  router.tsx
  routeTree.gen.ts        # generated
  server/
    content.server.ts     # server functions wrapping /lib/cms.*
```

Keep these directories at the repository root for now:

- `components/`
- `content/`
- `css/`
- `lib/`
- `public/`

Configure TanStack Start with `srcDirectory: "src"` and `router.routesDirectory: "app"`.

## Phase 0: Baseline before migration

1. Create a migration branch.
2. Capture the current route inventory and a small HTML/metadata baseline:
   - `/`
   - `/about`
   - `/posts`
   - one representative `/posts/:id`
   - `/quotes`
   - one representative `/quotes/:id`
   - `/resume`
   - `/design-system`
   - `/unfurl?path=/about`
3. Record current redirects:
   - `/austin` -> `/atx`
   - `/greenpipes/2016/10/30/greenpipes.html` -> `/posts/greenpipes`
4. Run formatting/type/build checks if possible before making framework changes.

## Phase 1: Dependencies and project config

### Package changes

Add TanStack Start/Vite packages:

```bash
npm i @tanstack/react-start @tanstack/react-router
npm i -D vite @vitejs/plugin-react @tailwindcss/vite @netlify/vite-plugin-tanstack-start @types/react-dom
```

Optional font packages if choosing Fontsource instead of manually self-hosting Google font files:

```bash
npm i @fontsource-variable/open-sans @fontsource-variable/space-grotesk
```

Remove Next/PostCSS packages after the Start build is working:

```bash
npm rm next next-themes @tailwindcss/postcss postcss autoprefixer
```

Keep:

- `react`, `react-dom`
- `tailwindcss`
- `@tailwindcss/typography`
- FontAwesome packages
- Markdoc/YAML/Zod/date-fns content dependencies

Audit later:

- `@tailwindcss/forms` appears installed but not currently referenced from `css/index.css`.
- `@mdx-js/mdx` may be unused.
- `components/search/*` is currently unused and still references `NEXT_PUBLIC_ES_READ_URL`.

### Scripts

Update `package.json` to ESM and Vite/Start scripts:

```json
{
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "start": "node .output/server/index.mjs",
    "preview": "vite preview",
    "fmt": "npx biome format --write",
    "format:check": "npx biome format --check",
    "typecheck": "tsc --noEmit"
  }
}
```

If the Netlify plugin changes the production start/publish output, adjust after the first successful build.

### Vite config

Create `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: "src",
      router: {
        routesDirectory: "app",
      },
      prerender: {
        enabled: true,
        crawlLinks: true,
        filter: ({ path }) => !path.startsWith("/unfurl"),
      },
      sitemap: {
        enabled: true,
        host: "https://drusellers.com",
      },
    }),
    netlify(),
    viteReact(),
  ],
});
```

Notes:

- `viteReact()` must come after `tanstackStart()`.
- Use the Netlify plugin for deployment. Do not also add a generic Nitro deployment plugin unless the Netlify plugin is removed.
- If dynamic content pages are not all discovered through links during prerendering, add an explicit `pages` list generated from the CMS.

### TypeScript config

Update `tsconfig.json`:

- Remove the Next plugin.
- Remove `.next/**` and `next-env.d.ts` includes.
- Add `src/**/*.ts` and `src/**/*.tsx` if needed.
- Keep `baseUrl` and aliases, but add a broad alias to simplify Start files:

```json
"paths": {
  "@/*": ["./*"],
  "@/components/*": ["components/*"],
  "@/lib/*": ["lib/*"]
}
```

- Target at least `ES2022` if Start examples require it.
- Add Vite client types if needed.

### Remove Next config later

After route parity:

- Delete `next.config.js`.
- Delete `next-env.d.ts`.
- Delete `postcss.config.js` once Tailwind works through `@tailwindcss/vite`.

## Phase 2: Root document, CSS, and fonts

### Root route

Convert `app/layout.tsx` to `src/app/__root.tsx` using TanStack Router:

- `createRootRoute`
- `HeadContent`
- `Outlet`
- `Scripts`

Root responsibilities:

- Render `<html lang="en" suppressHydrationWarning>` equivalent.
- Render `<HeadContent />` in `<head>`.
- Render the existing `ThemeScript` in `<head>`.
- Render the body classes/variables.
- Render a theme provider replacement, `ThemeLoader`, route outlet, and `TailwindDebug`.
- Render `<Scripts />` before `</body>`.

### CSS/Tailwind

Keep `css/index.css`, but import it from `__root.tsx` as a stylesheet URL:

```ts
/// <reference types="vite/client" />
import appCss from "../../css/index.css?url";
```

Then add it to `head.links`:

```ts
links: [{ rel: "stylesheet", href: appCss }]
```

Update the first Tailwind import to explicitly scan the project root if needed:

```css
@import "tailwindcss" source("../");
```

Keep the existing CSS-first Tailwind v4 directives:

- `@theme`
- `@theme inline`
- `@utility`
- `@plugin "@tailwindcss/typography"`
- `@variant dark (...)`

Remove PostCSS after this works.

### Fonts

Replace `next/font/google` and `next/font/local`.

Current fonts:

- Open Sans from `next/font/google`
- Space Grotesk from `next/font/google`
- Humane from `public/fonts/Humane-VF.ttf`

Preferred migration:

1. Use Fontsource packages or self-host downloaded font files.
2. Define font faces/variables in CSS instead of `next/font` classes.
3. Keep the existing CSS variables used by Tailwind:

```css
:root {
  --font-humane: "Humane";
  --font-open-sans: "Open Sans";
  --font-space-g: "Space Grotesk";
}
```

Add a `@font-face` for Humane pointing at `/fonts/Humane-VF.ttf`.

## Phase 3: Server-only content layer

TanStack Start is not using Next Server Components in this migration. Components hydrate in the browser, so React components must not import Node filesystem code directly.

Create `src/server/content.server.ts` and mark it server-only:

```ts
import "@tanstack/react-start/server-only";
import { createServerFn } from "@tanstack/react-start";
```

Wrap existing CMS functions in server functions/loaders that return serializable data:

- `getHomeData`
- `getAboutData`
- `getPostsIndexData`
- `getPostPageData(id)`
- `getTagsIndexData`
- `getTagPageData(id)`
- `getQuotesIndexData`
- `getQuotePageData(id)`
- `getValuesIndexData`
- `getValuePageData(id)`
- `getResumePageData`
- `getStackPageData`
- `getAtxPageData`
- `getAllegoryPageData`
- `getReadmePageData`
- `getSidebarData`

Rules:

- Route components call `Route.useLoaderData()`; they do not call `getFile`, `getFiles`, or `lib/cms.*` directly.
- Layouts that need content, especially the Oxford sidebar, load it through layout loaders.
- Return plain JSON-compatible objects. Avoid returning React nodes, functions, class instances, `Map`, etc.
- Convert `Date` objects to strings if any are introduced.
- Validate route params with server function validators or route param parsing.
- For missing content, throw the TanStack Router not-found/error path instead of crashing from `fs.readFileSync`.

Deployment risk: serverless bundles may not automatically include raw `content/**` files for runtime filesystem reads. Mitigation options:

1. Verify Netlify output includes content and that server functions can read it at runtime.
2. If not, generate a build-time content manifest/JSON module and have server functions read from that instead of raw files.
3. Alternatively, configure Vite/Netlify to copy `content/**` into the server bundle if supported.

## Phase 4: Framework adapters and component cleanup

### Links

Replace `next/link`.

Short-term migration helper:

- Create `components/InternalLink.tsx` with an API close to Next's `Link` (`href`, `className`, `children`).
- Internally use TanStack Router's `<Link to="...">` for internal URLs and `<a>` for external URLs.
- Replace imports from `next/link` with this helper first.
- Later, convert route-by-route to typed TanStack `<Link to="/posts/$id" params={{ id }}>` where useful.

Files with `next/link` include:

- `components/DateTitle.tsx`
- `components/Logo.tsx`
- `components/TagList.tsx`
- `components/PageControls.tsx`
- `components/oxford/*`
- `components/designSystem/DesignSystemSidebar.tsx`
- several route pages

### Navigation hooks

Replace:

- `useRouter().push(...)` -> `useNavigate()` or router navigation.
- `usePathname()` -> `useRouterState({ select: s => s.location.pathname })`.
- `useSearchParams()` -> route search params or router location search.

Affected files:

- `components/PageControls.tsx`
- `components/DevUnfurlLink.tsx`
- `components/TailwindDebug.tsx`

### Theme handling

Remove `next-themes`.

Options:

1. Keep the existing `ThemeScript` and `ThemeLoader`, then write a small local `ThemeProvider`/`useTheme` hook backed by `localStorage` and `matchMedia`.
2. Or simplify `ThemeToggle` to manage `localStorage`, `document.documentElement.classList`, and `document.body.classList` directly.

Update `ThemeToggle.tsx` to use the local theme hook instead of `useTheme` from `next-themes`.

### Images

Replace `next/image` in `app/(oxford)/about/page.tsx`.

Because the image is local and already specifies dimensions, use a normal `<img>` first. Consider `@unpic/react` later only if image optimization is needed.

### Client/server directives

Existing `"use client"` directives can remain temporarily, but they do not create the same Server Component boundary as Next. Audit all components for direct Node-only imports.

Important cases:

- `components/oxford/Sidebar.tsx` currently imports `getAbout()` and must become a pure component receiving sidebar data as props.
- Route components currently importing `lib/cms.*` must move that work into loaders/server functions.
- `components/Markdown.tsx` imports Markdoc utilities. Prefer passing already-rendered HTML from server loaders for content pages.

## Phase 5: Route migration pattern

Every page should follow the same basic pattern:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { getSomething } from "@/src/server/content.server";

export const Route = createFileRoute("/some/path")({
  loader: async () => getSomething(),
  head: ({ loaderData }) => buildSeo(loaderData.seo),
  component: Page,
});

function Page() {
  const data = Route.useLoaderData();
  return <div>{/* render data */}</div>;
}
```

Changes from Next:

- `export default async function Page(...)` becomes a sync component.
- `params: Promise<{ id: string }>` becomes `Route.useParams()` or loader `params`.
- `searchParams: Promise<...>` becomes route search validation + `Route.useSearch()`.
- `generateStaticParams()` is replaced by Start prerender crawling or explicit `pages` config.
- `generateMetadata()`/`metadata` becomes route `head`.

### Layout routes

- Convert `app/(oxford)/layout.tsx` to `src/app/_oxford.tsx` with `<Outlet />`.
- Convert `app/(design-system)/layout.tsx` to `src/app/_design-system.tsx` with `<Outlet />`.
- Load Oxford sidebar content in the `_oxford` loader and pass it into `Sidebar` as props.

### Pages with special attention

- `/quotes`: currently computes `Math.random()` during render. Move this to the route loader to avoid hydration mismatches.
- `/resume`: move markdown rendering/summary variable interpolation into server data or ensure Markdoc browser bundling is intentional.
- `/unfurl`: replace `headers()` with Start request/server APIs. Exclude from static prerendering because it depends on request host and search params.
- `/text/:id`: implement as a TanStack Start server route returning `text/plain`.

## Phase 6: SEO and metadata

Replace Next metadata helpers with framework-neutral SEO helpers.

Create `lib/seo.ts` that returns TanStack route `head` data:

- `meta`: title, description, Open Graph, Twitter, article fields.
- `links`: canonical URL and favicon.
- optional `scripts`: JSON-LD later if desired.

Convert existing helpers:

- `lib/cms.metadata.ts` -> default SEO/head builder.
- `lib/metadata.ts` -> article/page SEO builder without `next` types.

Metadata parity checklist:

- Default title: `Dru Sellers`
- Default description
- Favicon `/images/favicon.png`
- Open Graph site name, author, URL, image
- Twitter card data
- Dynamic post title/description/tags/published time
- Dynamic quote title/description
- Canonical URLs for all public pages

Use `/unfurl?path=...` and direct HTML inspection to compare before/after.

## Phase 7: Static prerendering and sitemap

Enable Start prerendering:

```ts
prerender: {
  enabled: true,
  crawlLinks: true,
  filter: ({ path }) => !path.startsWith("/unfurl"),
}
```

Rely on crawl discovery initially because index pages link to dynamic content:

- `/posts` links to all `/posts/:id`
- `/quotes` links to all `/quotes/:id`
- `/values` links to all `/values/:id`
- `/tags` links to all `/tags/:id`

If any dynamic route is missed, add an explicit `pages` list generated from CMS IDs.

Enable sitemap generation:

```ts
sitemap: {
  enabled: true,
  host: "https://drusellers.com",
}
```

Verify generated static HTML includes real content and real SEO tags, not only a loading shell.

## Phase 8: Server routes, redirects, headers, and Netlify

### `/text/:id`

Convert `app/(oxford)/text/[id]/route.ts` to a Start server route:

```ts
export const Route = createFileRoute("/text/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => new Response(content, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }),
    },
  },
});
```

Return 404 `Response` when content does not exist.

### Redirects

Move these out of `next.config.js`:

- `/austin` -> `/atx` 301
- `/greenpipes/2016/10/30/greenpipes.html` -> `/posts/greenpipes` 301

Prefer `netlify.toml` redirects for these static redirects.

### Headers

Update `netlify.toml` from Next output to Vite/Start output.

Manual Netlify baseline from Start docs:

```toml
[build]
  command = "npm run build"
  publish = "dist/client"

[dev]
  command = "npm run dev"
  port = 3000
```

Keep existing image cache headers. Add Vite asset cache headers:

```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
  Cache-Control = "max-age=31536000, immutable"
```

Verify whether the Netlify plugin requires or overrides `publish` after the first deploy build.

## Phase 9: Environment variables

Vite exposes public variables with `VITE_` by default.

Audit and replace:

- `NEXT_PUBLIC_ES_READ_URL` -> `VITE_ES_READ_URL`, or configure Vite `envPrefix` temporarily.
- `process.env.NODE_ENV` in client code -> `import.meta.env.DEV` / `import.meta.env.PROD`.

Known files:

- `components/search/es.js` references `NEXT_PUBLIC_ES_READ_URL`, but search appears unused.
- `components/DevUnfurlLink.tsx` checks `process.env.NODE_ENV`.

Server-side environment usage can continue through `process.env` in server functions.

## Phase 10: Cleanup

After route parity and deployment work:

- Delete old Next `app/` files or keep temporarily under a clearly named archive directory outside routing.
- Delete `next.config.js`.
- Delete `next-env.d.ts`.
- Delete `postcss.config.js`.
- Remove Next/PostCSS dependencies from `package.json` and `package-lock.json`.
- Update `README.md` to say TanStack Start, not Astro/Hugo/Next.
- Update `CLAUDE.md` project overview if desired.
- Update Biome `files.includes` to cover `src/**/*.ts` and `src/**/*.tsx`.

## Validation checklist

Run locally:

```bash
npm run fmt
npm run typecheck
npm run build
npm run dev
```

Manual route checks:

- `/`
- `/about`
- `/posts`
- several `/posts/:id`
- `/quotes`
- several `/quotes/:id`
- `/tags` and a tag page
- `/values` and a value page
- `/resume` print styles
- `/design-system` pages
- `/text/greenpipes`
- `/unfurl?path=/about`
- `/austin` redirect
- legacy `/greenpipes/.../greenpipes.html` redirect

HTML/SEO checks:

- View source contains article content for prerendered pages.
- `<title>` and meta description match current behavior.
- OG/Twitter meta tags match current behavior.
- Canonical URLs are correct.
- Favicon is present.
- Sitemap is generated and contains expected pages.

Browser checks:

- Internal navigation works without full reload where expected.
- Dark mode toggles and persists.
- No hydration mismatch warnings.
- Code highlighting still runs after navigation.
- `?tw` Tailwind debug still works.
- Fonts load without layout regressions.

Deployment checks:

- Netlify build succeeds.
- Static assets are served and cached.
- Server functions/server routes work in Netlify production or preview.
- Raw content access works at runtime, or content has been moved to a generated manifest.

## Main risks

1. **Server/client import boundaries**: existing Next Server Components import filesystem-backed CMS functions directly. In Start, move this to server functions/loaders.
2. **Runtime content availability**: Netlify serverless output may not include raw `content/**` files unless configured. Validate early.
3. **SEO parity**: Next metadata helpers must be replaced carefully with route `head` data.
4. **Hydration mismatches**: random values and date-derived values must come from loaders, not client render.
5. **Fonts**: replacing `next/font` can change performance and metrics. Prefer self-hosted/fontsource setup.
6. **Deployment output**: Netlify plugin output/publish settings should be verified with an actual build.
