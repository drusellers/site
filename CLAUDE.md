# CLAUDE.md

This file provides guidance to AI assistants when working with code in this repository.

## Project Overview

This is a **Next.js 16 personal website** using the App Router with content stored as Markdown files and YAML frontmatter. The site generates static HTML at build time and includes multiple layout variants for different content types.

## Development Commands

```bash
npm run dev              # Start Next.js dev server (localhost:3000)
npm run build            # Production build
npm run start            # Start production server
npm run fmt              # Format code with Biome
npm run format:check     # Check formatting without changing files
npx tsc                  # Type check
```

## Code Style & Quality

- **Formatter**: Biome (tabs, double quotes)
- **Linting**: Biome with recommended rules
- **TypeScript**: Strict mode disabled, but strict null checks enabled
- Always run `npm run fmt` before committing
- Use the provided formatting script, not the legacy prettier one

## Architecture

### Data Flow

```
/content (Markdown + YAML frontmatter)
    → /lib/cms.*.ts (file reading + parsing)
    → React components
    → Static HTML at build time
```

### Key Directories

- **`/content`** - Source of truth for all content (posts, quotes, values, resume.yml, etc.)
- **`/lib`** - Data layer and utilities
  - `cms.ts` - Base file operations (`getFiles`, `getFile`)
  - `cms.posts.ts`, `cms.quotes.ts`, etc. - Content-specific data fetching
  - `md.ts` - Markdoc processing
  - `markdocTags.ts` - Custom Markdoc tags
- **`/app`** - Next.js App Router pages
  - `(oxford)/` - Route group with shared layout (sidebar + footer)
  - `(design-system)/` - Design system documentation route
- **`/components`** - React components
  - `oxford/` - Layout-specific components (Sidebar, Footer, etc.)

### Route Groups

- `(oxford)` - Main site layout with sidebar navigation
- `(design-system)` - Design system documentation with its own layout

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
| About | `/content/about.yml` | `cms.about.ts` |
| Appearances | `/content/appearances/*.md` | `cms.appearances.ts` |
| Stack | `/content/stack.yml` | `cms.stack.ts` |
| ATX | `/content/atx/*.md` | `cms.atx.ts` |
| Allegory | `/content/allegory/*.md` | `cms.allegory.ts` |

### Path Aliases

TypeScript paths configured in tsconfig.json:
- `@/components/*` → `components/*`
- `@/lib/*` → `lib/*`

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4 with typography and forms plugins
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
4. Test content changes locally with `npm run dev`

### When Working with Components

1. Check existing components in `oxford/` for patterns
2. Use TypeScript with proper typing
3. Follow the Biome formatting rules
4. Leverage existing utility functions from `/lib`

### When Adding New Content Types

1. Create corresponding CMS module: `cms.[type].ts`
2. Follow the existing pattern in other CMS modules
3. Add the content type to this documentation

### File Organization

- Keep components in their appropriate directories (`oxford/` for layout-specific)
- Place utilities and data fetching logic in `/lib`
- Store all content in `/content` with consistent naming
- Use route groups when multiple layouts are needed
