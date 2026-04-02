import React, { useMemo, useState, useEffect } from "react"
import { Link, graphql, withPrefix } from "gatsby"
import collaboratorLinks from "@utils/collaboratorLinks"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Layout } from "@components"
import { Icon } from "@components/icons"

const StyledMainContainer = styled.main`
  max-width: 760px;
  margin: 0 auto;
  padding: 48px 24px;

  @media (max-width: 768px) {
    padding: 32px 16px;
  }

  header {
    margin-bottom: 36px;

    h1 {
      font-size: clamp(1.6rem, 4vw, 2.2rem);
      font-weight: 600;
      letter-spacing: -0.03em;
      margin-bottom: 6px;
    }

    .subtitle {
      color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
      font-size: 0.88rem;
      font-weight: 400;
    }
  }
`

const StyledFilters = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px 160px;
  gap: 8px;
  margin: 0 0 32px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  input[type="search"],
  select {
    background: ${({ theme }) =>
      theme.mode === "light" ? "#f5f5f7" : "#161616"};
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
    border-radius: 8px;
    padding: 9px 12px;
    font-size: 0.82rem;
    outline: none;
    transition: border-color 0.15s ease;

    &:focus {
      border-color: #0071e3;
    }

    &::placeholder {
      color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
    }
  }

  select {
    cursor: pointer;
  }
`

const StyledPublicationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const StyledPublication = styled.article`
  padding: 20px 0;
  border-bottom: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#f0f0f0" : "#1d1d1f")};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
  }

  h3 {
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 6px;
    letter-spacing: -0.01em;
    line-height: 1.4;

    a {
      color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
      text-decoration: none;

      &:hover {
        color: #0071e3;
      }

      &:after {
        display: none;
      }
    }
  }

  .authors {
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#86868b")};
    font-size: 0.8rem;
    margin-bottom: 6px;
    line-height: 1.5;

    .me {
      color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
      font-weight: 500;
    }

    a {
      color: inherit;
      text-decoration: none;

      &:after {
        display: none;
      }
    }

    a:hover {
      color: #0071e3;
    }
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    flex-wrap: wrap;

    .venue {
      color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};
      border: 1px solid
        ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
      padding: 2px 8px;
      border-radius: 4px;
    }

    .date {
      color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
    }
  }

  .abstract {
    color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};
    font-size: 0.82rem;
    line-height: 1.6;
    margin-bottom: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .links {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;

    .share-wrapper {
      position: relative;
      display: inline-block;
    }

    .share-menu {
      position: absolute;
      top: calc(100% + 4px);
      right: 0;
      background: ${({ theme }) =>
        theme.mode === "light" ? "#ffffff" : "#1d1d1f"};
      border: 1px solid
        ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
      border-radius: 8px;
      padding: 6px;
      display: grid;
      gap: 4px;
      min-width: 160px;
      z-index: 5;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
      font-family: var(--font-mono);
      font-size: 0.7rem;
      text-decoration: none;
      transition: color 0.15s ease;

      &:hover {
        color: #0071e3;
      }

      &:after {
        display: none;
      }

      svg {
        width: 14px;
        height: 14px;
      }
    }

    button.share-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
      background: transparent;
      border: none;
      padding: 0;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      cursor: pointer;
      transition: color 0.15s ease;

      &:hover {
        color: #0071e3;
      }

      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
`

const PublicationsPage = ({ location, data }) => {
  const publications = data.allMarkdownRemark.edges
  const siteUrl = data.site.siteMetadata.siteUrl

  const [query, setQuery] = useState("")
  const [year, setYear] = useState("All")
  const [venueFilter, setVenueFilter] = useState("All")
  const [openShare, setOpenShare] = useState(null)

  useEffect(() => {
    const onClick = e => {
      if (!openShare) return
      const wrapper = e.target.closest?.(".share-wrapper")
      if (!wrapper || wrapper.getAttribute("data-share") !== openShare) {
        setOpenShare(null)
      }
    }
    const onKey = e => {
      if (e.key === "Escape") setOpenShare(null)
    }
    document.addEventListener("click", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("click", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [openShare])

  const years = useMemo(() => {
    const set = new Set()
    publications.forEach(({ node }) => {
      const d = node.frontmatter.date
      if (d) set.add(new Date(d).getFullYear())
    })
    return Array.from(set).sort((a, b) => b - a)
  }, [publications])

  const venues = useMemo(() => {
    const set = new Set()
    publications.forEach(({ node }) => {
      const v = node.frontmatter.venue
      if (v) set.add(v)
    })
    return Array.from(set).sort()
  }, [publications])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return publications.filter(({ node }) => {
      const fm = node.frontmatter
      const y = fm.date ? new Date(fm.date).getFullYear().toString() : ""
      const matchesYear = year === "All" || y === String(year)
      const matchesVenue = venueFilter === "All" || fm.venue === venueFilter
      const hay = `${fm.title || ""} ${fm.authors || ""} ${
        fm.venue || ""
      }`.toLowerCase()
      const matchesQuery = q === "" || hay.includes(q)
      return matchesYear && matchesVenue && matchesQuery
    })
  }, [publications, query, year, venueFilter])

  return (
    <Layout location={location}>
      <Helmet title="Publications" />

      <StyledMainContainer>
        <header>
          <h1>Publications</h1>
          <p className="subtitle">Research papers and academic work</p>
        </header>

        <StyledFilters>
          <input
            type="search"
            placeholder="Search title, authors, venue..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Search publications"
          />
          <select
            value={year}
            onChange={e => setYear(e.target.value)}
            aria-label="Filter by year"
          >
            <option value="All">All years</option>
            {years.map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            value={venueFilter}
            onChange={e => setVenueFilter(e.target.value)}
            aria-label="Filter by venue"
          >
            <option value="All">All venues</option>
            {venues.map(v => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </StyledFilters>

        <StyledPublicationsList>
          {filtered.length > 0 &&
            filtered.map(({ node }, i) => {
              const { frontmatter } = node
              const {
                title,
                slug,
                authors,
                date,
                venue,
                abstract,
                arxiv,
                googlescholar,
                semanticscholar,
                paperurl,
                code,
                slides,
              } = frontmatter

              const formattedDate = new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })

              const isArxivPdf = paperurl && /arxiv\.org/.test(paperurl)
              const shareUrl = arxiv || paperurl || `${siteUrl}${slug}`
              const shareText = `${title}${venue ? " — " + venue : ""}`
              const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                shareText
              )}&url=${encodeURIComponent(shareUrl)}`
              const liHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                shareUrl
              )}`

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
                <StyledPublication key={i}>
                  <h3>
                    <Link to={slug}>{title}</Link>
                  </h3>
                  <p className="authors">{renderAuthors(authors)}</p>
                  <div className="meta">
                    {venue && <span className="venue">{venue}</span>}
                    <span className="date">{formattedDate}</span>
                  </div>
                  {abstract && <p className="abstract">{abstract}</p>}
                  <div className="links">
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
                    {paperurl && (!isArxivPdf || !arxiv) && (
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
                    {googlescholar && (
                      <a
                        href={googlescholar}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open Google Scholar for ${title}`}
                      >
                        <Icon name="GScholar" />
                        Scholar
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
                        Semantic
                      </a>
                    )}
                    <div className="share-wrapper" data-share={slug}>
                      <button
                        type="button"
                        className="share-btn"
                        aria-haspopup="menu"
                        aria-expanded={openShare === slug}
                        onClick={e => {
                          e.stopPropagation()
                          setOpenShare(openShare === slug ? null : slug)
                        }}
                      >
                        <Icon name="Share" /> Share
                      </button>
                      {openShare === slug && (
                        <div
                          className="share-menu"
                          role="menu"
                          aria-label={`Share ${title}`}
                        >
                          <a
                            href={xHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            role="menuitem"
                          >
                            <Icon name="Twitter" /> Share on X
                          </a>
                          <a
                            href={liHref}
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
                              navigator.clipboard.writeText(shareUrl)
                            }
                            role="menuitem"
                            aria-label="Copy link"
                          >
                            Copy link
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </StyledPublication>
              )
            })}
        </StyledPublicationsList>
      </StyledMainContainer>
    </Layout>
  )
}

PublicationsPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export default PublicationsPage

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/publications/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            authors
            date
            venue
            abstract
            arxiv
            googlescholar
            semanticscholar
            paperurl
            code
            slides
          }
        }
      }
    }
  }
`
