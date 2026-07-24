# ClearFlow Plumbing Website

Vite + React + TypeScript rebuild of [clearflowpm.com](https://clearflowpm.com).

## Prerequisites

- Node.js 18+ (20 LTS recommended)
- npm 9+

## Install and run

**Important:** run all commands from this folder (`clearflow-plumbing-website`), not the parent `CODING - TRW` workspace folder.

```bash
cd "/Users/tylergraham/CODING - TRW /clearflow-plumbing-website"
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Routes

| URL | Page |
|-----|------|
| `/` | Homepage (about, previews, contact) |
| `/services` | All services |
| `/services/jet-blasting` | Individual service pages (×7) |
| `/projects` | Full project gallery |

Articles and location pages will be added during the DevArchitecture build phase.

## Common install errors

| Error | Cause | Fix |
|-------|--------|-----|
| `ENOENT: no such file or directory, open '.../package.json'` | Running `npm install` in the parent folder | `cd` into `clearflow-plumbing-website` first (see command above) |
| `no such file or directory: CODING - TRW` | Missing trailing space in folder name | Use `CODING - TRW ` (note the space before the closing quote) |
| `Unknown env config "devdir"` | npm config warning only | Safe to ignore; install should still succeed |
| `Port 5173 is in use` | Another dev server still running | Stop the old process, or use the alternate port Vite prints (e.g. http://localhost:5174/) |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run typecheck` | TypeScript check |
| `npm run generate:sitemap` | Regenerate `public/sitemap.xml` |

## Architecture

See `DevArchitecture.md` and `/implementation/` for plans and status.
