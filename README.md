Site heavily adapted from: https://github.com/bchiang7/v4

Run `gatsby develop` to start the development server.

## After changing files in `static/`

- **CV or a slide deck** (`static/cv/JacobDineen_CV.pdf`, `static/slides/*.pdf`):
  run `npm run pdf-pages` (needs `pdftoppm` from poppler-utils) and commit
  the images it writes. The site shows these page images instead of
  embedding the PDF. If a PDF changes without them, the build warns and the
  page falls back to embedding the PDF.
- **A paper teaser** (`static/teasers/*.webp`): run `npm run teasers`, then
  `git checkout -- 'static/teasers/*-[0-9]*.webp'` for teasers you didn't change.

Install packages with `yarn` (the repo uses `yarn.lock`).
