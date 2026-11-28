// Page images from scripts/pdf-pages.js for one PDF, or [] if there are
// none or they were rendered from a different version of the PDF.
const crypto = require("crypto")
const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..", "static")

module.exports = (pdf, out, reporter) => {
  const dir = path.join(root, out)
  const stamp = path.join(dir, "source.sha256")
  const src = path.join(root, pdf)
  if (!fs.existsSync(stamp) || !fs.existsSync(src)) return []
  const hash = crypto
    .createHash("sha256")
    .update(fs.readFileSync(src))
    .digest("hex")
  if (fs.readFileSync(stamp, "utf8").trim() !== hash) {
    if (reporter) {
      reporter.warn(
        `${pdf} changed since its page images were made; showing the PDF ` +
          `itself. Run \`npm run pdf-pages\` to update the preview.`
      )
    }
    return []
  }
  return fs
    .readdirSync(dir)
    .filter(f => /^\d+\.webp$/.test(f))
    .sort()
    .map(f => `${out}/${f}`)
}
