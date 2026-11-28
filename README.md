Site heavily adapted from: https://github.com/bchiang7/v4

Run `gatsby develop` to start the development server.

## After changing files in `static/`

- **CV or a slide deck** (`static/cv/JacobDineen_CV.pdf`, `static/slides/*.pdf`):
  run `npm run pdf-pages` (needs `pdftoppm` from poppler-utils) and commit
  the images it writes. The site shows these page images instead of
  embedding the PDF. If a PDF changes without them, the build warns and the
  page falls back to embedding the PDF.
- **A paper teaser** (`static/teasers/*.webp`): run `npm run teasers`, then
  restore the size variants of teasers you didn't change, e.g.
  `git checkout -- 'static/teasers/*-400.webp' 'static/teasers/*-560.webp' 'static/teasers/*-820.webp'`
  and then re-add the new teaser's variants (the script rewrites them all).

Install packages with `yarn` (the repo uses `yarn.lock`).
