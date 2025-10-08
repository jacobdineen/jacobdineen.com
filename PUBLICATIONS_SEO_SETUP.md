# Publications SEO & Google Scholar Setup

## Overview

Implemented a complete publication indexing system to make your research papers discoverable by Google Scholar and other academic search engines.

## What Was Done

### 1. ✅ Added Slug Fields to All Publications

Each publication now has a unique URL slug:

- ThinkTuning: `/publications/thinktuning-2025`
- QA-LIGN: `/publications/qa-lign-2025`
- BOW: `/publications/bow-2025`
- CC-LEARN: `/publications/cc-learn-2025`
- ToW: `/publications/tow-2024`
- And all others...

### 2. ✅ Created Individual Publication Pages

**File:** `src/templates/publication.js`

Each publication now has its own dedicated page with:

- **Google Scholar Meta Tags:**

  - `citation_title`
  - `citation_author` (for each author)
  - `citation_publication_date`
  - `citation_conference_title` / `citation_journal_title`
  - `citation_arxiv_id`
  - `citation_pdf_url`

- **Schema.org Structured Data:**

  ```json
  {
    "@type": "ScholarlyArticle",
    "headline": "...",
    "author": [...],
    "datePublished": "...",
    "publisher": "...",
    "abstract": "..."
  }
  ```

- **Rich Content Display:**
  - Full abstract
  - Author list
  - Venue and date
  - Links to arXiv, Google Scholar, Semantic Scholar, PDF, Code
  - BibTeX citation with copy button

### 3. ✅ Updated Gatsby Build Process

**File:** `gatsby-node.js`

Added automatic page generation for all publications. Each publication markdown file automatically creates a standalone page at build time.

### 4. ✅ Created Publications Index Page

**File:** `src/pages/publications/index.js`
**URL:** `/publications`

A dedicated page listing all publications with:

- Title (links to individual page)
- Authors
- Venue and date
- Abstract preview
- Quick links to external resources

### 5. ✅ Updated Homepage Experience Section

**File:** `src/components/sections/experience/experience.js`

Publication titles on the homepage now link to their individual pages, providing:

- Better user experience
- More ways for search engines to discover publication pages
- Consistent navigation

## How It Works for Google Scholar

### Meta Tags

Google Scholar crawls websites looking for specific meta tags:

```html
<meta name="citation_title" content="ThinkTuning: ..." />
<meta name="citation_author" content="Aswin RRV" />
<meta name="citation_author" content="Jacob Dineen" />
<meta name="citation_publication_date" content="2025/08/11" />
<meta name="citation_conference_title" content="EMNLP 2025" />
<meta name="citation_arxiv_id" content="2508.07616" />
<meta name="citation_pdf_url" content="https://arxiv.org/pdf/2508.07616.pdf" />
```

### Structured Data

Search engines use Schema.org structured data to understand content:

```json
{
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "headline": "ThinkTuning: Instilling Cognitive Reflections without Distillation",
  "author": [
    {"@type": "Person", "name": "Aswin RRV"},
    {"@type": "Person", "name": "Jacob Dineen"},
    ...
  ],
  "datePublished": "2025-08-11",
  "publisher": "EMNLP 2025",
  "abstract": "...",
  "url": "https://jacobdineen.github.io/publications/thinktuning-2025"
}
```

## Next Steps

### 1. Build and Deploy

```bash
npm run build
# or
gatsby build
```

Then deploy to your GitHub Pages.

### 2. Submit to Google Scholar

Once deployed, you can:

- Wait for Google Scholar to automatically crawl your site (can take weeks)
- Or submit your profile through Google Scholar's author profile system

### 3. Verify Indexing

After deployment, verify the meta tags are present:

1. Visit any publication page
2. Right-click → "View Page Source"
3. Search for `citation_title` to confirm meta tags are rendered

### 4. Monitor Results

- Check Google Scholar in 2-4 weeks
- Your papers should start appearing in search results
- Citations should link back to your website

## Benefits

✅ **Google Scholar Indexing:** Papers will be discoverable in academic search  
✅ **Unique URLs:** Each paper has a shareable, permanent link  
✅ **Rich Snippets:** Search engines show enhanced results  
✅ **Better SEO:** Improved visibility in general search results  
✅ **Professional Presentation:** Clean, modern publication pages  
✅ **Easy Citations:** BibTeX readily available for each paper

## Files Modified

### New Files:

- `src/templates/publication.js` - Publication page template
- `src/pages/publications/index.js` - Publications listing page
- `PUBLICATIONS_SEO_SETUP.md` - This documentation

### Modified Files:

- All publication markdown files (added `slug` field)
- `gatsby-node.js` (added publication page generation)
- `src/components/sections/experience/experience.js` (added links and slug query)

## Maintenance

When adding new publications:

1. Create markdown file in `content/publications/`
2. Include required frontmatter fields:
   - `title`
   - `slug` (e.g., `/publications/paper-name-year`)
   - `authors`
   - `date`
   - `venue`
   - `abstract`
   - `bibtex`
3. Add optional links: `arxiv`, `paperurl`, `code`, etc.
4. Run `gatsby build` to generate the page

The system will automatically:

- Generate a dedicated page
- Add proper meta tags
- Include structured data
- List it on `/publications`
- Make it linkable from homepage
