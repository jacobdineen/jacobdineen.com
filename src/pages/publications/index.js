import React, { useMemo, useState, useEffect } from "react"
import { Link, graphql, withPrefix } from "gatsby"
import collaboratorLinks from "@utils/collaboratorLinks"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Layout } from "@components"
import { Icon } from "@components/icons"

const StyledMainContainer = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 50px;

  @media (max-width: 768px) {
    padding: 80px 25px;
  }

  header {
    margin-bottom: 60px;

    h1 {
      font-size: clamp(40px, 8vw, 80px);
      margin-bottom: 20px;
    }

    .subtitle {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-md);
      font-weight: 400;
      line-height: 1.5;
    }
  }
`

const StyledFilters = styled.div`
  display: grid;
  grid-template-columns: 1fr 160px 200px;
  gap: 12px;
  margin: 0 0 24px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  input[type="search"],
  select {
    background: var(--light-navy);
    color: var(--lightest-slate);
    border: 1px solid var(--lightest-navy);
    border-radius: var(--border-radius);
    padding: 10px 12px;
    font-size: var(--fz-sm);
    outline: none;
  }
`

const StyledPublicationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const StyledPublication = styled.article`
  position: relative;
  padding: 30px;
  background-color: var(--light-navy);
  border-radius: var(--border-radius);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
  }

  h3 {
    font-size: var(--fz-xxl);
    margin-bottom: 15px;

    a {
      position: relative;
      color: var(--lightest-slate);
      text-decoration: none;

      &:hover {
        color: var(--green);
      }

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 0;
      }
    }
  }

  .authors {
    color: var(--light-slate);
    font-size: var(--fz-lg);
    margin-bottom: 10px;

    .me {
      color: var(--green);
      font-weight: 600;
    }

    a {
      color: var(--slate);
      text-decoration: none;
      border-bottom: 1px dotted transparent;
      transition: color 0.2s var(--easing), border-color 0.2s var(--easing);
    }

    a:hover {
      color: var(--green);
      border-color: var(--green);
    }

    a:focus-visible {
      color: var(--green);
      border-color: var(--green);
      outline: 2px solid var(--green);
      outline-offset: 2px;
    }
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    flex-wrap: wrap;

    .venue {
      color: var(--green);
    }

    .date {
      color: var(--light-slate);
    }
  }

  .abstract {
    color: var(--light-slate);
    font-size: var(--fz-md);
    line-height: 1.5;
    margin-bottom: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .links {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;

    .share-wrapper {
      position: relative;
      display: inline-block;
    }

    .share-menu {
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      background: var(--light-navy);
      border: 1px solid var(--lightest-navy);
      border-radius: var(--border-radius);
      padding: 8px;
      display: grid;
      gap: 6px;
      min-width: 180px;
      z-index: 5;
      box-shadow: 0 10px 24px -18px var(--navy-shadow);
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      text-decoration: none;
      transition: color 0.25s;

      &:hover {
        color: var(--green);
      }

      &:focus-visible {
        outline: 2px solid var(--green);
        outline-offset: 2px;
      }

      svg {
        width: 18px;
        height: 18px;
      }
    }

    button.share-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: var(--green);
      background: transparent;
      border: 1px solid var(--green);
      border-radius: var(--border-radius);
      padding: 8px 12px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      cursor: pointer;

      &:hover {
        background: var(--green-tint);
      }

      &:focus-visible {
        outline: 2px solid var(--green);
        outline-offset: 2px;
      }

      svg {
        width: 18px;
        height: 18px;
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

  // Close share menu on outside click or ESC
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
          <h1 className="big-heading">Publications</h1>
          <p className="subtitle">Research papers and academic work</p>
        </header>

        <StyledFilters>
          <input
            type="search"
            placeholder="Search title, authors, venue…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Search publications"
          />
          <select
            value={year}
            onChange={e => setYear(e.target.value)}
            aria-label="Filter by year"
          >
            <option>All</option>
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
            <option>All</option>
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
                    <Link to={slug}>View Details →</Link>
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
