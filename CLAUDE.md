# CLAUDE.md

This file provides guidance to AI assistants when working with code in this repository.

## Project Overview

This is a **TanStack Start personal website** using TanStack Router file-based routes, React, Tailwind CSS 4, and Markdown/YAML content. Public pages are statically prerendered at build time.

## Development Commands

```bash
npm run dev              # Start Vite/TanStack Start dev server (localhost:3000)
npm run build            # Production build + type check
npm run start            # Start production server output
npm run preview          # Preview production client build
npm run typecheck        # Type check only
npm run fmt              # Format code with Biome
npm run format:check     # Check formatting without changing files
```

## Code Style & Quality

- **Formatter**: Biome (tabs, double quotes)
- **Linting**: Biome with recommended rules
- **TypeScript**: strict mode enabled
- Always run `npm run fmt` before committing

## Architecture

### Data Flow

```
/content (Markdown + YAML frontmatter)
    → /lib/cms.*.ts (file reading + parsing)
    → /src/data/content.ts (TanStack server functions)
    → /src/app route loaders
    → React components
    → Static HTML prerendered at build time
```

### Key Directories

- **`/src/app`** - TanStack Router file routes
  - `_oxford.tsx` - Main pathless layout (sidebar + footer)
  - `_design-system.tsx` - Design system pathless layout
- **`/src/data`** - TanStack Start server functions that wrap filesystem-backed CMS modules
- **`/content`** - Source of truth for all content
- **`/lib`** - Data layer and utilities
  - `cms.ts` - Base file operations (`getFiles`, `getFile`)
  - `cms.posts.ts`, `cms.quotes.ts`, etc. - Content-specific data fetching
  - `md.ts` - Markdoc processing
  - `markdocTags.ts` - Custom Markdoc tags
  - `seo.ts` - Framework-neutral head/SEO helpers
- **`/components`** - Shared React components
  - `oxford/` - Main layout components
  - `designSystem/` - Design system components

### Route Layouts

- `_oxford` - Main site layout with sidebar navigation
- `_design-system` - Design system documentation with its own sidebar

### Markdown Processing

Posts use **Markdoc** with custom tags defined in `lib/markdocTags.ts`:

- `{% chip color="#hex" %}` - Inline color chip
- `{% sidenote %}...{% /sidenote %}` - Margin notes
- `{% callout type="info" %}...{% /callout %}` - Callout boxes
- `{% youtube src="url" %}` - YouTube embeds
- Code fences with syntax highlighting via highlight.js

### Content Types

| Type | Location | CMS Module |
|------|----------|------------|
| Posts | `/content/posts/*.md` | `cms.posts.ts` |
| Quotes | `/content/quotes/*.md` | `cms.quotes.ts` |
| Values | `/content/values/*.md` | `cms.values.ts` |
| Resume | `/content/resume.yml` | `cms.resume.ts` |
| About | `/content/about.md` | `cms.about.ts` |
| Appearances | `/content/appearances/*.md` | `cms.appearances.ts` |
| Stack | `/content/stack.md` | `cms.stack.ts` |
| ATX | `/content/atx.md` | `cms.atx.ts` |
| Allegory | `/content/allegory.yml` | `cms.allegory.ts` |

### Path Aliases

TypeScript paths configured in tsconfig.json:
- `@/*` → repository root
- `@/components/*` → `components/*`
- `@/lib/*` → `lib/*`

## Technology Stack

- **Framework**: TanStack Start with TanStack Router
- **Build tool**: Vite
- **Styling**: Tailwind CSS 4 via `@tailwindcss/vite`
- **Content**: Markdoc for Markdown processing
- **Icons**: FontAwesome Pro (requires `.npmrc` token)
- **Data Validation**: Zod schemas
- **Date Handling**: date-fns
- **Code Highlighting**: highlight.js
- **Node Version**: 22.14.0 (see `.nvmrc`)

## Development Guidelines

### When Working with Content

1. All content changes should be made in the `/content` directory
2. Follow existing frontmatter patterns for each content type
3. Use the appropriate CMS module when adding new data fetching logic
4. Expose page-level data through `/src/data/content.ts` server functions
5. Test content changes locally with `npm run dev`

### When Working with Components

1. Check existing components in `oxford/` for patterns
2. Keep shared components framework/data agnostic where possible
3. Do not import filesystem-backed CMS modules directly from components
4. Use TypeScript with proper typing
5. Follow the Biome formatting rules

### When Adding New Content Types

1. Create corresponding CMS module: `cms.[type].ts`
2. Add a server function in `/src/data/content.ts`
3. Create the route under `/src/app`
4. Add the content type to this documentation

### File Organization

- Keep route files in `/src/app`
- Keep server functions in `/src/data`
- Keep reusable components in `/components`
- Place utilities and data fetching logic in `/lib`
- Store all content in `/content` with consistent naming
