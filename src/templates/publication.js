import React, { useState, useEffect, useRef } from "react"
import useOnClickOutside from "@hooks/useOnClickOutside"
import { graphql, Link, withPrefix } from "gatsby"
import collaboratorLinks from "@utils/collaboratorLinks"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import { Layout } from "@components"
import { Icon } from "@components/icons"

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
    font-size: clamp(28px, 5vw, 42px);
    margin-bottom: 20px;
    color: ${({ theme }) => theme.colors[theme.mode].text};
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .authors {
    font-size: var(--fz-md);
    color: ${({ theme }) => theme.colors[theme.mode].textSecondary};
    margin-bottom: 16px;
    line-height: 1.6;

    .me {
      color: #0071e3;
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
      color: #0071e3;
      font-weight: 500;
      padding: 4px 12px;
      background: ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(0, 113, 227, 0.1)"
          : "rgba(0, 113, 227, 0.15)"};
      border-radius: 980px;
    }

    .date {
      opacity: 0.7;
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

  button.share-btn {
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
  } = frontmatter

  // Parse authors for meta tags
  const authorList = authors ? authors.split(",").map(a => a.trim()) : []

  // Extract arXiv ID if available
  const arxivId = arxiv ? arxiv.match(/(\d{4}\.\d{4,5})/)?.[1] : null

  // Format date for citation
  const publicationDate = new Date(date)
  const citationDate = `${publicationDate.getFullYear()}/${String(
    publicationDate.getMonth() + 1
  ).padStart(2, "0")}/${String(publicationDate.getDate()).padStart(2, "0")}`

  const copyBibtex = () => {
    navigator.clipboard.writeText(bibtex)
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
          <object className="embed" data={slidesPath} type="application/pdf">
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
      <Helmet title={title}>
        {/* Google Scholar Meta Tags */}
        <meta name="citation_title" content={title} />
        {authorList.map((author, i) => (
          <meta key={i} name="citation_author" content={author} />
        ))}
        <meta name="citation_publication_date" content={citationDate} />
        {venue && <meta name="citation_conference_title" content={venue} />}
        {venue && <meta name="citation_journal_title" content={venue} />}
        {arxivId && <meta name="citation_arxiv_id" content={arxivId} />}
        {paperurl && <meta name="citation_pdf_url" content={paperurl} />}
        {abstract && (
          <meta name="description" content={abstract.substring(0, 160)} />
        )}

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        {abstract && (
          <meta
            property="og:description"
            content={abstract.substring(0, 200)}
          />
        )}

        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            headline: title,
            author: authorList.map(name => ({
              "@type": "Person",
              name: name,
            })),
            datePublished: publicationDate.toISOString().split("T")[0],
            publisher: venue || "arXiv",
            abstract: abstract,
            url: `https://jacobdineen.github.io${slug}`,
            ...(arxiv && { sameAs: arxiv }),
            ...(paperurl && { url: paperurl }),
          })}
        </script>
      </Helmet>

      <StyledPublicationContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/#experience">All publications</Link>
        </span>

        <StyledPublicationHeader>
          <h1>{title}</h1>
          <p className="authors">{renderAuthors(authors)}</p>
          {venue && (
            <div className="meta">
              <span className="venue">{venue}</span>
            </div>
          )}
        </StyledPublicationHeader>

        <StyledLinks>
          {arxiv && (
            <a
              href={arxiv}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open arXiv for ${title}`}
            >
              <Icon name="Arxiv" />
              arXiv
            </a>
          )}
          {googlescholar && (
            <a
              href={googlescholar}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open Google Scholar for ${title}`}
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
              aria-label={`Open Semantic Scholar for ${title}`}
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
              aria-label={`Open PDF for ${title}`}
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
              aria-label={`Open code repository for ${title}`}
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
              aria-label={`Open slides for ${title}`}
            >
              <Icon name="Slides" />
              Slides
            </a>
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
            <button onClick={copyBibtex}>Copy BibTeX</button>
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
      }
    }
  }
`
