// Renders PDFs the site previews to WebP page images:
//   static/slides/<deck>.pdf  -> static/slides/<name>/01.webp, 01-600.webp, ...
//   static/cv/JacobDineen_CV.pdf -> static/cv/pages/01.webp, 01-600.webp, ...
// Pages show these instead of embedding the PDF: phones render an embedded
// PDF badly or not at all (Android shows nothing, iOS only page 1), Chrome
// showed the slide decks blank, and an embedded PDF keeps the page out of
// the browser's back/forward cache.
//
// Each folder also gets source.sha256, the PDF's hash. gatsby-node compares
// it with the PDF at build time and falls back to embedding the PDF if they
// differ, so an updated CV is never shown with old page images.
//
// Needs pdftoppm (poppler-utils). Run after changing the CV or a deck:
//   npm run pdf-pages
const crypto = require("crypto")
const fs = require("fs")
const os = require("os")
const path = require("path")
const { execFileSync } = require("child_process")
const sharp = require("sharp")
const slideDir = require("./slide-dir")

const root = path.join(__dirname, "..", "static")
const FULL = 1200
const SMALL = 600

const jobs = [
  { pdf: "/cv/JacobDineen_CV.pdf", out: "/cv/pages" },
  ...fs
    .readdirSync(path.join(root, "slides"))
    .filter(f => f.toLowerCase().endsWith(".pdf"))
    .map(f => ({ pdf: `/slides/${f}`, out: slideDir(`/slides/${f}`) })),
]

const render = async ({ pdf, out }) => {
  const src = path.join(root, pdf)
  const dir = path.join(root, out)
  fs.rmSync(dir, { recursive: true, force: true })
  fs.mkdirSync(dir, { recursive: true })
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "pdf-pages-"))
  execFileSync("pdftoppm", ["-r", "150", "-png", src, path.join(tmp, "p")])
  const pages = fs.readdirSync(tmp).sort()
  for (const [i, p] of pages.entries()) {
    const n = String(i + 1).padStart(2, "0")
    const img = path.join(tmp, p)
    await sharp(img)
      .resize({ width: FULL })
      .webp({ quality: 72 })
      .toFile(path.join(dir, `${n}.webp`))
    await sharp(img)
      .resize({ width: SMALL })
      .webp({ quality: 72 })
      .toFile(path.join(dir, `${n}-${SMALL}.webp`))
  }
  fs.rmSync(tmp, { recursive: true, force: true })
  const hash = crypto
    .createHash("sha256")
    .update(fs.readFileSync(src))
    .digest("hex")
  fs.writeFileSync(path.join(dir, "source.sha256"), `${hash}\n`)
  console.log(`${pdf}: ${pages.length} pages -> ${out}`)
}

const run = async () => {
  for (const job of jobs) await render(job)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
