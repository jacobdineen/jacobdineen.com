// Where scripts/slide-images.js writes the page images for a slides PDF:
// "/slides/EMNLP 2025_Find-3576 slides.pdf" -> "/slides/emnlp-2025-find-3576-slides"
const path = require("path")

module.exports = pdf =>
  path.posix.join(
    path.posix.dirname(pdf),
    path.posix
      .basename(pdf, ".pdf")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  )
