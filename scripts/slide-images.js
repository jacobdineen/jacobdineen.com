// Renders every page of each slides PDF in static/slides to a 1200px WebP
// (static/slides/<name>/01.webp, 02.webp, ...). Paper pages show these in
// their own viewer, because browsers render multi-page PDFs in a frame
// unreliably (blank in Chrome for these decks, first page only on phones).
// Needs pdftoppm (poppler-utils). Run after adding or replacing a deck:
//   npm run slides
const fs = require("fs")
const os = require("os")
const path = require("path")
const { execFileSync } = require("child_process")
const sharp = require("sharp")
const slideDir = require("./slide-dir")

const root = path.join(__dirname, "..", "static")

const run = async () => {
  const pdfs = fs
    .readdirSync(path.join(root, "slides"))
    .filter(f => f.toLowerCase().endsWith(".pdf"))
  for (const f of pdfs) {
    const out = path.join(root, slideDir(`/slides/${f}`))
    fs.rmSync(out, { recursive: true, force: true })
    fs.mkdirSync(out, { recursive: true })
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "slides-"))
    execFileSync("pdftoppm", [
      "-r",
      "150",
      "-png",
      path.join(root, "slides", f),
      path.join(tmp, "p"),
    ])
    const pages = fs.readdirSync(tmp).sort()
    for (const [i, p] of pages.entries()) {
      await sharp(path.join(tmp, p))
        .resize({ width: 1200 })
        .webp({ quality: 72 })
        .toFile(path.join(out, `${String(i + 1).padStart(2, "0")}.webp`))
    }
    fs.rmSync(tmp, { recursive: true, force: true })
    console.log(`${f}: ${pages.length} pages -> ${path.relative(root, out)}`)
  }
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
