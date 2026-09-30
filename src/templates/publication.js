import React, { useState, useEffect, useRef } from "react"
import useOnClickOutside from "@hooks/useOnClickOutside"
import { graphql, Link, withPrefix } from "gatsby"
import collaboratorLinks from "@utils/collaboratorLinks"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import { Layout, ReadingProgress } from "@components"
import { Icon } from "@components/icons"
import venueTier from "@utils/venueTier"

const StyledPublicationContainer = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 50px;

  @media (max-width: 768px) {
    padding: 24px 20px;
  }

  .breadcrumb {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 32px;
    color: #0071e3;
    font-size: var(--fz-sm);
    font-weight: 500;

    a {
      color: #0071e3;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    /* Hide on mobile since we have minimal header */
    @media (max-width: 767px) {
      display: none !important;
    }
  }
`

const StyledPublicationHeader = styled.header`
  margin-bottom: 40px;

  h1 {
    font-family: var(--font-serif);
    font-size: clamp(1.6rem, 4.5vw, 2.6rem);
    margin-bottom: 18px;
    color: ${({ theme }) => theme.colors[theme.mode].text};
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.15;
    font-variation-settings: "opsz" 96;
  }

  .authors {
    font-size: var(--fz-md);
    color: ${({ theme }) => theme.colors[theme.mode].textSecondary};
    margin-bottom: 16px;
    line-height: 1.6;

    .me {
      color: ${({ theme }) => theme.colors[theme.mode].text};
      font-weight: 600;
    }

    a {
      color: ${({ theme }) => theme.colors[theme.mode].textSecondary};
      text-decoration: none;
      border-bottom: 1px dotted transparent;
      transition: var(--transition);
    }

    a:hover {
      color: #0071e3;
      border-color: #0071e3;
    }

    a:focus-visible {
      color: #0071e3;
      border-color: #0071e3;
      outline: 2px solid #0071e3;
      outline-offset: 2px;
    }
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: var(--font-sans);
    font-size: var(--fz-sm);
    color: ${({ theme }) => theme.colors[theme.mode].textSecondary};
    flex-wrap: wrap;

    .venue {
      color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 400;
      padding: 3px 9px;
      border: 1px solid
        ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#2d2d2d")};
      border-radius: 4px;
      background: transparent;
    }

    .venue.tier-top {
      color: ${({ theme }) => (theme.mode === "light" ? "#0058b0" : "#6cb4ff")};
      border-color: ${({ theme }) =>
        theme.mode === "light" ? "#b3d4f5" : "#1f4a75"};
      background: ${({ theme }) =>
        theme.mode === "light" ? "#eef5fd" : "rgba(10, 132, 255, 0.12)"};
    }

    .venue.tier-conf {
      color: ${({ theme }) => (theme.mode === "light" ? "#2f6b3a" : "#7fd08e")};
      border-color: ${({ theme }) =>
        theme.mode === "light" ? "#bfdcc4" : "#2b5234"};
      background: ${({ theme }) =>
        theme.mode === "light" ? "#f1f8f2" : "rgba(52, 199, 89, 0.10)"};
    }

    .venue.tier-ws {
      color: ${({ theme }) => (theme.mode === "light" ? "#8a5a00" : "#f0b85c")};
      border-color: ${({ theme }) =>
        theme.mode === "light" ? "#ecd3a4" : "#5c4520"};
      background: ${({ theme }) =>
        theme.mode === "light" ? "#fdf7ec" : "rgba(255, 159, 10, 0.10)"};
    }

    .venue.tier-pre {
      border-style: dashed;
    }

    .date {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#9a9894")};
    }
  }

  .tldr {
    margin: 0 0 20px;
    max-width: 62ch;
    font-family: var(--font-serif);
    font-size: clamp(1.02rem, 2.2vw, 1.2rem);
    line-height: 1.5;
    font-weight: 400;
    color: ${({ theme }) => (theme.mode === "light" ? "#3a3a3c" : "#c9c7c3")};
    text-wrap: pretty;
  }
`

const StyledFigure = styled.figure`
  margin: 8px 0 40px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2a2826")};
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    display: block;
    width: 100%;
    max-height: 420px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    padding: 12px;
    margin: 0 0 28px;

    img {
      max-height: 260px;
    }
  }
`

const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0 40px;
  flex-wrap: wrap;

  a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    background-color: transparent;
    border: 1px solid #0071e3;
    border-radius: 980px;
    color: #0071e3;
    font-family: var(--font-sans);
    font-size: var(--fz-sm);
    font-weight: 500;
    text-decoration: none;
    transition: var(--transition);

    &:hover {
      background-color: #0071e3;
      color: white;
      transform: translateY(-2px);
    }

    svg {
      width: 18px;
      height: 18px;
    }

    &:focus-visible {
      outline: 2px solid #0071e3;
      outline-offset: 2px;
    }
  }

  .share-wrapper {
    position: relative;
    display: inline-block;
  }

  .share-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: ${({ theme }) => theme.colors[theme.mode].surface};
    border: 1px solid ${({ theme }) => theme.colors[theme.mode].border};
    border-radius: var(--border-radius);
    padding: 8px;
    display: grid;
    gap: 4px;
    min-width: 180px;
    z-index: 5;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

    a,
    button {
      border: none;
      border-radius: 8px;
      padding: 10px 14px;
      font-size: var(--fz-sm);

      &:hover {
        background: ${({ theme }) =>
          theme.mode === "light"
            ? "rgba(0, 0, 0, 0.05)"
            : "rgba(255, 255, 255, 0.1)"};
        transform: none;
      }
    }
  }

  button.bib-btn.copied {
    background-color: #0071e3;
    color: white;
  }

  button.share-btn,
  button.bib-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    background-color: transparent;
    border: 1px solid #0071e3;
    border-radius: 980px;
    color: #0071e3;
    font-family: var(--font-sans);
    font-size: var(--fz-sm);
    font-weight: 500;
    text-decoration: none;
    transition: var(--transition);
    cursor: pointer;

    &:hover {
      background-color: #0071e3;
      color: white;
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 2px solid #0071e3;
      outline-offset: 2px;
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }
`

const StyledAbstract = styled.div`
  margin: 48px 0;
  padding: 32px;
  background: ${({ theme }) =>
    theme.mode === "light" ? "#f5f5f7" : "#161616"};
  border-radius: var(--border-radius);
  border: 1px solid ${({ theme }) => theme.colors[theme.mode].border};

  h2 {
    font-size: var(--fz-xl);
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors[theme.mode].text};
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  p {
    font-size: var(--fz-md);
    line-height: 1.8;
    color: ${({ theme }) => theme.colors[theme.mode].textSecondary};
    text-align: left;
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: 24px 20px;
    margin: 32px 0;

    p {
      font-size: var(--fz-sm);
      line-height: 1.7;
    }
  }
`

const StyledBibtex = styled.div`
  margin: 48px 0;

  h2 {
    font-size: var(--fz-xl);
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors[theme.mode].text};
    font-weight: 600;
  }

  pre {
    background: ${({ theme }) =>
      theme.mode === "light" ? "#1d1d1f" : "#161616"};
    border-radius: var(--border-radius);
    padding: 24px;
    overflow-x: auto;
    border: 1px solid ${({ theme }) => theme.colors[theme.mode].border};

    code {
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: ${({ theme }) => (theme.mode === "light" ? "#f5f5f7" : "#a1a1a6")};
      line-height: 1.6;
    }
  }

  button {
    margin-top: 16px;
    padding: 10px 20px;
    background-color: transparent;
    border: 1px solid #0071e3;
    border-radius: 980px;
    color: #0071e3;
    font-family: var(--font-sans);
    font-size: var(--fz-sm);
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);

    &:hover {
      background-color: #0071e3;
      color: white;
    }
  }

  @media (max-width: 768px) {
    margin: 32px 0;

    pre {
      padding: 16px;

      code {
        font-size: 11px;
      }
    }
  }
`

const StyledSlides = styled.div`
  margin: 48px 0;

  h2 {
    font-size: var(--fz-xl);
    margin-bottom: 16px;
    color: ${({ theme }) => theme.colors[theme.mode].text};
    font-weight: 600;
  }

  .embed {
    width: 100%;
    height: 600px;
    border: 0;
    border-radius: var(--border-radius);
    background: ${({ theme }) =>
      theme.mode === "light" ? "#f5f5f7" : "#161616"};
    border: 1px solid ${({ theme }) => theme.colors[theme.mode].border};
  }

  .fallback {
    margin-top: 12px;
    font-family: var(--font-sans);
    font-size: var(--fz-sm);
    color: ${({ theme }) => theme.colors[theme.mode].textSecondary};

    a {
      color: #0071e3;
    }
  }

  @media (max-width: 768px) {
    margin: 32px 0;

    .embed {
      height: 400px;
    }
  }
`

const PublicationTemplate = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark
  const { siteUrl } = data.site.siteMetadata
  const {
    title,
    authors,
    date,
    venue,
    abstract,
    bibtex,
    arxiv,
    googlescholar,
    semanticscholar,
    paperurl,
    code,
    slug,
    slides,
    tags,
    teaser,
    tldr,
  } = frontmatter
  const pageSlug = (slug || "").split("/").filter(Boolean).pop()
  const ogImage = pageSlug ? `${siteUrl}/og/${pageSlug}.png` : null
  const tier = venueTier(venue)
  const summary = tldr || (abstract ? abstract.substring(0, 200) : null)

  // Parse authors for meta tags
  const authorList = authors ? authors.split(",").map(a => a.trim()) : []

  // Extract arXiv ID if available
  const arxivId = arxiv ? arxiv.match(/(\d{4}\.\d{4,5})/)?.[1] : null

  // Format date for citation
  const [yy, mm = 1, dd = 1] = String(date || "")
    .slice(0, 10)
    .split("-")
    .map(Number)
  const publicationDate = new Date(Date.UTC(yy, mm - 1, dd))
  const pad = n => String(n).padStart(2, "0")
  const citationDate = `${yy}/${pad(mm)}/${pad(dd)}`
  const displayDate = publicationDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })

  // Scholar: only real venues get a conference title. Preprints and
  // under-review papers are indexed through their arXiv id instead.
  const isPublishedVenue = venue && tier !== "tier-pre"
  const pdfUrl = arxivId
    ? `https://arxiv.org/pdf/${arxivId}`
    : paperurl && /\.pdf($|\?)/i.test(paperurl)
    ? paperurl
    : null

  const [bibCopied, setBibCopied] = useState(false)
  const copyBibtex = () => {
    if (!bibtex || typeof navigator === "undefined") return
    navigator.clipboard.writeText(bibtex).then(() => {
      setBibCopied(true)
      setTimeout(() => setBibCopied(false), 1600)
    })
  }

  // Share menu open/close
  const [shareOpen, setShareOpen] = useState(false)
  const shareRef = useRef(null)

  useOnClickOutside(shareRef, () => setShareOpen(false))
  useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape") setShareOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const getSlidesEmbed = () => {
    if (!slides) return null
    const isAbsolute = /^https?:\/\//i.test(slides)
    const baseOrigin =
      typeof window !== "undefined" && window.location
        ? window.location.origin
        : siteUrl
    const slidesPath = isAbsolute ? slides : withPrefix(slides)
    const absoluteUrl = isAbsolute ? slides : `${baseOrigin}${slidesPath}`
    const lower = slides.toLowerCase()
    const isPdf = lower.endsWith(".pdf")
    const isPpt = [".ppt", ".pptx", ".pwpt"].some(ext => lower.endsWith(ext))

    if (isPdf) {
      return (
        <>
          <object
            className="embed"
            data={slidesPath}
            type="application/pdf"
            aria-label={`Slides for ${title}`}
          >
            <p className="fallback">
              PDF preview unavailable. <a href={slidesPath}>Download PDF</a>
            </p>
          </object>
        </>
      )
    }

    if (isPpt) {
      const officeSrc = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        absoluteUrl
      )}`
      return (
        <>
          <iframe title="Slides" className="embed" src={officeSrc} />
          <p className="fallback">
            Having trouble? <a href={slidesPath}>Download slides</a>
          </p>
        </>
      )
    }

    return (
      <p className="fallback">
        Slide preview unsupported. <a href={slidesPath}>Download file</a>
      </p>
    )
  }

  const renderAuthors = authorsStr => {
    if (!authorsStr) return null
    const names = authorsStr
      .split(",")
      .map(n => n.trim())
      .filter(Boolean)

    return names.map((name, idx) => {
      const key = name.toLowerCase()
      const url = collaboratorLinks[key]
      const isMe = /jacob\s+dineen/i.test(name)
      const content = isMe ? (
        <span className="me">{name}</span>
      ) : url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      ) : (
        <span>{name}</span>
      )
      return (
        <span key={`${key}-${idx}`}>
          {content}
          {idx < names.length - 1 ? ", " : null}
        </span>
      )
    })
  }

  return (
    <Layout location={location}>
      <ReadingProgress />
      <Helmet title={title}>
        {/* Google Scholar Meta Tags */}
        <meta name="citation_title" content={title} />
        {authorList.map((author, i) => (
          <meta key={i} name="citation_author" content={author} />
        ))}
        <meta name="citation_publication_date" content={citationDate} />
        {isPublishedVenue && (
          <meta name="citation_conference_title" content={venue} />
        )}
        {arxivId && <meta name="citation_arxiv_id" content={arxivId} />}
        {pdfUrl && <meta name="citation_pdf_url" content={pdfUrl} />}
        {slug && (
          <meta
            name="citation_abstract_html_url"
            content={`${siteUrl}${slug}`}
          />
        )}
        {summary && <meta name="description" content={summary} />}

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogImage && <meta property="og:image:width" content="1200" />}
        {ogImage && <meta property="og:image:height" content="630" />}
        {ogImage && <meta property="og:image:alt" content={title} />}
        <meta property="og:url" content={`${siteUrl}${slug}`} />
        {summary && <meta property="og:description" content={summary} />}
        <meta
          property="article:published_time"
          content={publicationDate.toISOString()}
        />
        {authorList.map((author, i) => (
          <meta
            key={`og-author-${i}`}
            property="article:author"
            content={author}
          />
        ))}
        {(tags || []).map((t, i) => (
          <meta key={`og-tag-${i}`} property="article:tag" content={t} />
        ))}

        {/* Twitter card per-pub overrides (site defaults set in head.js) */}
        <meta name="twitter:title" content={title} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        {summary && <meta name="twitter:description" content={summary} />}

        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            headline: title,
            name: title,
            author: authorList.map(name => ({
              "@type": "Person",
              name,
            })),
            datePublished: publicationDate.toISOString().split("T")[0],
            inLanguage: "en",
            ...(venue && {
              publisher: { "@type": "Organization", name: venue },
            }),
            ...(abstract && { abstract }),
            ...(tags && tags.length > 0 && { keywords: tags }),
            url: `${siteUrl}${slug}`,
            mainEntityOfPage: `${siteUrl}${slug}`,
            ...((arxiv || semanticscholar || googlescholar || paperurl) && {
              sameAs: [arxiv, semanticscholar, googlescholar, paperurl].filter(
                Boolean
              ),
            }),
            ...(arxivId && {
              identifier: {
                "@type": "PropertyValue",
                propertyID: "arXiv",
                value: arxivId,
              },
            }),
          })}
        </script>
      </Helmet>

      <StyledPublicationContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/#experience">All publications</Link>
        </span>

        <StyledPublicationHeader>
          <h1
            style={{
              viewTransitionName: slug
                ? `pub-title-${slug.replace(/\W+/g, "-")}`
                : undefined,
            }}
          >
            {title}
          </h1>
          {tldr && <p className="tldr">{tldr}</p>}
          <p className="authors">{renderAuthors(authors)}</p>
          {(venue || date) && (
            <div className="meta">
              {venue && <span className={`venue ${tier}`}>{venue}</span>}
              {date && <span className="date">{displayDate}</span>}
            </div>
          )}
        </StyledPublicationHeader>

        <StyledLinks>
          {arxiv && (
            <a
              href={arxiv}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`arXiv — ${title}`}
            >
              <Icon name="Arxiv" />
              arXiv
            </a>
          )}
          {arxiv && (
            <a
              href={arxiv.replace(
                /^https?:\/\/(www\.)?arxiv\.org\b/,
                "https://www.alphaxiv.org"
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`alphaXiv — ${title}`}
            >
              <Icon name="Alphaxiv" />
              alphaXiv
            </a>
          )}
          {googlescholar && (
            <a
              href={googlescholar}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Google Scholar — ${title}`}
            >
              <Icon name="GScholar" />
              Google Scholar
            </a>
          )}
          {semanticscholar && (
            <a
              href={semanticscholar}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Semantic Scholar — ${title}`}
            >
              <Icon name="SemanticScholar" />
              Semantic Scholar
            </a>
          )}
          {paperurl && (!/arxiv\.org/.test(paperurl) || !arxiv) && (
            <a
              href={paperurl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`PDF — ${title}`}
            >
              <Icon name="External" />
              PDF
            </a>
          )}
          {code && (
            <a
              href={code}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Code — ${title}`}
            >
              <Icon name="GitHub" />
              Code
            </a>
          )}
          {slides && (
            <a
              href={withPrefix(slides)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Slides — ${title}`}
            >
              <Icon name="Slides" />
              Slides
            </a>
          )}
          {bibtex && (
            <button
              type="button"
              className={`bib-btn${bibCopied ? " copied" : ""}`}
              onClick={copyBibtex}
              aria-live="polite"
            >
              <Icon name="Bookmark" />
              {bibCopied ? "Copied" : "BibTeX"}
            </button>
          )}
          {slug && (
            <div className="share-wrapper" ref={shareRef}>
              <button
                type="button"
                className="share-btn"
                aria-haspopup="menu"
                aria-expanded={shareOpen}
                onClick={e => {
                  e.stopPropagation()
                  setShareOpen(prev => !prev)
                }}
              >
                <Icon name="Share" /> Share
              </button>
              <div
                className="share-menu"
                role="menu"
                style={{ display: shareOpen ? "grid" : "none" }}
              >
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `${title}${venue ? " — " + venue : ""}`
                  )}&url=${encodeURIComponent(
                    arxiv || paperurl || `${siteUrl}${slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                >
                  <Icon name="Twitter" /> Share on X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    arxiv || paperurl || `${siteUrl}${slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                >
                  <Icon name="Linkedin" /> Share on LinkedIn
                </a>
                <button
                  type="button"
                  className="share-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      arxiv || paperurl || `${siteUrl}${slug}`
                    )
                  }
                  role="menuitem"
                  aria-label="Copy link"
                >
                  Copy link
                </button>
              </div>
            </div>
          )}
        </StyledLinks>

        {teaser && (
          <StyledFigure>
            <img
              src={withPrefix(teaser)}
              alt={`Overview figure for ${title}`}
              loading="eager"
              decoding="async"
            />
          </StyledFigure>
        )}

        {slides && (
          <StyledSlides>
            <h2>Slides</h2>
            {getSlidesEmbed()}
          </StyledSlides>
        )}

        {abstract && (
          <StyledAbstract>
            <h2>Abstract</h2>
            <p>{abstract}</p>
          </StyledAbstract>
        )}

        {html && <div dangerouslySetInnerHTML={{ __html: html }} />}

        {bibtex && (
          <StyledBibtex>
            <h2>Citation</h2>
            <pre>
              <code>{bibtex}</code>
            </pre>
            <button onClick={copyBibtex}>
              {bibCopied ? "Copied" : "Copy BibTeX"}
            </button>
          </StyledBibtex>
        )}
      </StyledPublicationContainer>
    </Layout>
  )
}

export default PublicationTemplate

PublicationTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
}

export const pageQuery = graphql`
  query ($path: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        slug
        authors
        date
        venue
        abstract
        bibtex
        arxiv
        googlescholar
        semanticscholar
        paperurl
        code
        slides
        tags
        teaser
        tldr
      }
    }
  }
`
