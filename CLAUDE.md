# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev          # Start Next.js dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run fmt          # Format code with Biome
npx tsc              # Type check
```

## Code Style

- **Formatter**: Biome (tabs, double quotes)
- **Linting**: Biome with recommended rules
- Run `npm run fmt` before committing

## Architecture

This is a **Next.js 16 personal website** using the App Router with content stored as Markdown files.

### Data Flow

```
/content (Markdown + YAML frontmatter)
    → /lib/cms.*.ts (file reading + parsing)
    → React components
    → Static HTML at build time
```

### Key Directories

- **`/content`** - Source of truth for all content (posts, quotes, values, resume.yml)
- **`/lib`** - Data layer and utilities
  - `cms.ts` - Base file operations (`getFiles`, `getFile`)
  - `cms.posts.ts`, `cms.quotes.ts`, etc. - Content-specific data fetching
  - `md.ts` - Markdoc processing
  - `markdocTags.ts` - Custom Markdoc tags
- **`/app`** - Next.js App Router pages
  - `(oxford)/` - Route group with shared layout (sidebar + footer)
- **`/components`** - React components
  - `oxford/` - Layout-specific components (Sidebar, Footer, etc.)

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

### Path Aliases

TypeScript paths configured in tsconfig.json:
- `@/components/*` → `components/*`
- `@/lib/*` → `lib/*`

## Dependencies

- Node 22.14.0 (see `.nvmrc`)
- FontAwesome Pro icons (requires `.npmrc` token)
- Tailwind CSS 4 with typography and forms plugins
