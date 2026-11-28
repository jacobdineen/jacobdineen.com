// Writes 400px, 560px and 820px copies of each teaser
// (static/teasers/<name>-400.webp, -560, -820): 400 and 560 for card
// thumbnails, 820 for the paper-page figure on phones. Variants newer than
// their teaser are left alone. Run after adding or replacing a teaser:
//   npm run teasers
const fs = require("fs")
const path = require("path")
const sharp = require("sharp")

const dir = path.join(__dirname, "..", "static", "teasers")
const WIDTHS = [400, 560, 820]

const run = async () => {
  const files = fs
    .readdirSync(dir)
    .filter(
      f => f.endsWith(".webp") && !WIDTHS.some(w => f.endsWith(`-${w}.webp`))
    )
  for (const f of files) {
    const src = path.join(dir, f)
    const { width } = await sharp(src).metadata()
    for (const w of WIDTHS) {
      if (width <= w) continue
      const out = path.join(dir, f.replace(/\.webp$/, `-${w}.webp`))
      // Only new or replaced teasers: re-encoding an existing variant
      // changes its bytes even when the teaser didn't change.
      if (
        fs.existsSync(out) &&
        fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs
      ) {
        continue
      }
      await sharp(path.join(dir, f))
        .resize({ width: w })
        .webp({ quality: 82 })
        .toFile(out)
      console.log(`${f} -> ${path.basename(out)}`)
    }
  }
}

run()
