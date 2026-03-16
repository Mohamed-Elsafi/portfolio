# Mohamed El-Safi — Portfolio Website

Static portfolio site for a Senior Civil Engineer targeting Tier-1 KSA contractor roles.

## Folder Contents

- `index.html` — Main single-page site with 6 sections (Hero, Projects, Methodology, About, Skills, Contact)
- `css/styles.css` — Complete stylesheet with mobile-first responsive design
- `js/main.js` — Navigation, accordion, scroll animations (no external dependencies)
- `pages/` — 4 case study detail subpages with full content and photo galleries
- `artifacts/` — 6 downloadable Excel workbook templates (.xlsx)
- `images/` — Web-optimized project photographs
- `.nojekyll` — Prevents GitHub Pages Jekyll processing

## Design System Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | #1B3A4B | Headers, nav, hero background |
| Secondary | #3A7CA5 | Links, accents, hover states |
| Surface | #E8E4DF | Alternating section backgrounds |
| Accent | #D97706 | CTAs, download buttons |
| Success | #059669 | Strong skill tier dot |
| Warning | #D97706 | Moderate skill tier dot |
| Muted | #9CA3AF | Supporting skill tier dot |

## How to Update Content

1. Edit text in `phase1-content.md` (the source of truth)
2. Regenerate the site files using the same build process
3. All text on the site should match `phase1-content.md` verbatim

## Deployment

Copy all files from this folder to your GitHub Pages repository root and push.
