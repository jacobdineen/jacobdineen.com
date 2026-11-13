// Writes a 560px-wide copy of each teaser (static/teasers/<name>-560.webp)
// for card thumbnails. Run after adding or replacing a teaser:
//   npm run teasers
const fs = require("fs")
const path = require("path")
const sharp = require("sharp")

const dir = path.join(__dirname, "..", "static", "teasers")
const WIDTH = 560

const run = async () => {
  const files = fs
    .readdirSync(dir)
    .filter(f => f.endsWith(".webp") && !f.endsWith(`-${WIDTH}.webp`))
  for (const f of files) {
    const out = path.join(dir, f.replace(/\.webp$/, `-${WIDTH}.webp`))
    await sharp(path.join(dir, f))
      .resize({ width: WIDTH })
      .webp({ quality: 82 })
      .toFile(out)
    console.log(`${f} -> ${path.basename(out)}`)
  }
}

run()
