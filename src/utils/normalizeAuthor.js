// WHY: Author lists in publication frontmatter use whatever form the paper used,
// so the same person can appear under multiple variants (e.g., "Don Kridel" vs
// "Donald Kridel"). This module canonicalizes a name so dedup + link lookup
// agree across the site.

// Map any known alias (lowercased) to its canonical lowercased form.
// Add new entries here as duplicates are discovered.
const ALIASES = {
  "donald kridel": "don kridel",
  "irbaz bin riaz": "irbaz b. riaz",
}

// Display name for each canonical key. Falls back to the first-seen variant.
const CANONICAL_DISPLAY = {
  "don kridel": "Don Kridel",
  "irbaz b. riaz": "Irbaz B. Riaz",
}

// Strip trailing punctuation and normalize whitespace.
const clean = name => name.replace(/\s+/g, " ").trim().toLowerCase()

const canonicalKey = name => {
  const k = clean(name)
  return ALIASES[k] || k
}

const canonicalDisplay = (name, originalName) => {
  const k = canonicalKey(name)
  return CANONICAL_DISPLAY[k] || originalName || name
}

module.exports = { canonicalKey, canonicalDisplay }
