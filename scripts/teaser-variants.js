// Writes 560px and 820px copies of each teaser
// (static/teasers/<name>-560.webp, <name>-820.webp): 560 for card
// thumbnails, 820 for the paper-page figure on phones. Run after adding or
// replacing a teaser:
//   npm run teasers
const fs = require("fs")
const path = require("path")
const sharp = require("sharp")

const dir = path.join(__dirname, "..", "static", "teasers")
const WIDTHS = [560, 820]

const run = async () => {
  const files = fs
    .readdirSync(dir)
    .filter(
      f => f.endsWith(".webp") && !WIDTHS.some(w => f.endsWith(`-${w}.webp`))
    )
  for (const f of files) {
    const { width } = await sharp(path.join(dir, f)).metadata()
    for (const w of WIDTHS) {
      if (width <= w) continue
      const out = path.join(dir, f.replace(/\.webp$/, `-${w}.webp`))
      await sharp(path.join(dir, f))
        .resize({ width: w })
        .webp({ quality: 82 })
        .toFile(out)
      console.log(`${f} -> ${path.basename(out)}`)
    }
  }
}

run()
