import React, { useState, useEffect, useRef, useMemo } from "react"
import { useStaticQuery, graphql, Link, withPrefix } from "gatsby"
import styled from "styled-components"
import { srConfig } from "@config"
import sr from "@utils/sr"
import { usePrefersReducedMotion } from "@hooks"
import EntryListItem from "./EntryListItem"
import StyledText from "./StyledText"
import StyledJobsSection from "./StyledJobsSection"
import StyledTabList from "./StyledTabList"
import PublicationListItem from "./PublicationListItem"
import {
  IconArxiv,
  IconGitHub,
  IconExternal,
  IconChevronRight,
  IconSlides,
} from "@components/icons"
import collaboratorLinks from "@utils/collaboratorLinks"

const ContentTypeButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 28px;
  padding: 8px 0 0;
  border-bottom: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
`

const ContentTypeButton = styled.button`
  position: relative;
  background: transparent;
  color: ${({ isActive, theme }) =>
    isActive
      ? theme.mode === "light"
        ? "#1d1d1f"
        : "#f5f5f7"
      : theme.mode === "light"
      ? "#6e6e73"
      : "#6e6e73"};
  border: none;
  border-radius: 0;
  padding: 6px 0;
  margin: 0 14px;
  font-size: 0.78rem;
  font-family: var(--font-mono);
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: color 0.15s ease;
  cursor: ${props => (props.isActive ? "default" : "pointer")};

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: ${({ isActive, theme }) =>
      isActive
        ? theme.mode === "light"
          ? "#1d1d1f"
          : "#f5f5f7"
        : "transparent"};
    transition: background-color 0.15s ease;
  }

  &:hover:not(:disabled) {
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  }

  &:focus-visible {
    outline: 2px solid #0071e3;
    outline-offset: 4px;
  }

  @media (max-width: 480px) {
    margin: 0 8px;
    font-size: 0.7rem;
  }
`

const StyledFilters = styled.div`
  display: grid;
  grid-template-columns: 1fr 140px 160px;
  gap: 10px;
  margin: 10px auto 20px auto;
  max-width: 900px;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  input[type="search"],
  select {
    background: ${({ theme }) =>
      theme.mode === "light" ? "#f5f5f7" : "#161616"};
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#3d3d3d")};
    border-radius: 8px;
    padding: 9px 14px;
    font-size: 0.84rem;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #0071e3;
    }

    &::placeholder {
      color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};
    }
  }

  select {
    cursor: pointer;
  }
`

const IntroText = styled.p`
  max-width: 560px;
  margin: 0 auto 12px;

  &:last-of-type {
    margin-bottom: 24px;
  }
`

const ShowAllButton = styled.button`
  display: block;
  margin: 12px auto 4px;
  background: none;
  border: none;
  color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};
  font-size: 0.78rem;
  font-family: var(--font-mono);
  cursor: pointer;
  padding: 6px 0;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  }
`

const Experience = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              range
              technologies {
                name
              }
            }
            html
          }
        }
      }
      publications: allMarkdownRemark(
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
              arxiv
              googlescholar
              semanticscholar
              paperurl
              code
              slides
              abstract
              bibtex
              technologies {
                name
              }
            }
            html
          }
        }
      }
      education: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/education/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              venue
              degree
              gpa
              range
              technologies {
                name
              }
            }
            html
          }
        }
      }
    }
  `)

  const jobsData = data.jobs.edges
  const publicationsData = data.publications.edges
  const educationData = data.education.edges
  const revealContainer = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeContentType, setActiveContentType] = useState("publications")
  const [showCourses, setShowCourses] = useState({})
  const [expandedCards, setExpandedCards] = useState({})
  const [showAllPubs, setShowAllPubs] = useState(false)

  // Publication filters
  const [pubQuery, setPubQuery] = useState("")
  const [pubYear, setPubYear] = useState("All")
  const [pubVenue, setPubVenue] = useState("All")

  const pubYears = useMemo(() => {
    const set = new Set()
    publicationsData.forEach(({ node }) => {
      const d = node.frontmatter.date
      if (d) set.add(new Date(d).getFullYear())
    })
    return Array.from(set).sort((a, b) => b - a)
  }, [publicationsData])

  const pubVenues = useMemo(() => {
    const set = new Set()
    publicationsData.forEach(({ node }) => {
      const v = node.frontmatter.venue
      if (v) set.add(v)
    })
    return Array.from(set).sort()
  }, [publicationsData])

  const filteredPublications = useMemo(() => {
    const q = pubQuery.trim().toLowerCase()
    return publicationsData.filter(({ node }) => {
      const fm = node.frontmatter
      const y = fm.date ? new Date(fm.date).getFullYear().toString() : ""
      const matchesYear = pubYear === "All" || y === String(pubYear)
      const matchesVenue = pubVenue === "All" || fm.venue === pubVenue
      const hay = `${fm.title || ""} ${fm.authors || ""} ${
        fm.venue || ""
      }`.toLowerCase()
      const matchesQuery = q === "" || hay.includes(q)
      return matchesYear && matchesVenue && matchesQuery
    })
  }, [publicationsData, pubQuery, pubYear, pubVenue])

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    sr.reveal(revealContainer.current, srConfig())
  }, [prefersReducedMotion])

  const activeData =
    activeContentType === "jobs"
      ? jobsData
      : activeContentType === "publications"
      ? publicationsData
      : educationData

  // Limit publications unless expanded (works on all devices)
  const PUB_LIMIT = 5
  const limitedPublications = !showAllPubs
    ? filteredPublications.slice(0, PUB_LIMIT)
    : filteredPublications

  const displayData =
    activeContentType === "publications" ? limitedPublications : activeData

  const hasMorePubs = filteredPublications.length > PUB_LIMIT

  const toggleCourses = i => {
    setShowCourses(prevState => ({
      ...prevState,
      [i]: !prevState[i],
    }))
  }

  const toggleCard = key => {
    setExpandedCards(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }

  const countBullets = html => {
    if (!html) return 0
    const matches = html.match(/<li[\s>]/g)
    return matches ? matches.length : 0
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
    <StyledJobsSection id="experience" ref={revealContainer}>
      <StyledText>
        <h3>Hey, I&apos;m Jake.</h3>
        <IntroText>
          I&apos;m a PhD student at{" "}
          <a
            href="https://arc-asu.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ASU&apos;s ARC Lab
          </a>{" "}
          working on LLM reasoning and alignment. Before that, ten years
          building ML infrastructure in fintech.
        </IntroText>

        <ContentTypeButtonsContainer>
          {[
            { id: "publications", label: "Publications" },
            { id: "education", label: "Education" },
            { id: "jobs", label: "Experience" },
          ].map(({ id, label }) => (
            <ContentTypeButton
              key={id}
              onClick={() => setActiveContentType(id)}
              disabled={activeContentType === id}
              isActive={activeContentType === id}
            >
              {label}
            </ContentTypeButton>
          ))}
        </ContentTypeButtonsContainer>

        <div className="inner">
          {activeContentType === "publications" && (
            <StyledFilters>
              <input
                type="search"
                placeholder="Search title, authors, venue…"
                value={pubQuery}
                onChange={e => setPubQuery(e.target.value)}
                aria-label="Search publications"
              />
              <select
                value={pubYear}
                onChange={e => setPubYear(e.target.value)}
                aria-label="Filter by year"
              >
                <option value="All">All years</option>
                {pubYears.map(y => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                value={pubVenue}
                onChange={e => setPubVenue(e.target.value)}
                aria-label="Filter by venue"
              >
                <option value="All">All venues</option>
                {pubVenues.map(v => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </StyledFilters>
          )}
          <StyledTabList>
            {displayData.map(({ node }, i) => {
              const { frontmatter } = node
              const { company, venue, title, date } = frontmatter

              if (activeContentType === "publications") {
                const formatted = date
                  ? new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })
                  : null
                const isArxivPdf =
                  frontmatter.paperurl &&
                  /arxiv\.org/.test(frontmatter.paperurl)

                return (
                  <PublicationListItem key={i}>
                    {frontmatter.slug ? (
                      <span className="title">
                        <Link
                          to={frontmatter.slug}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          {title || "N/A"}
                        </Link>
                      </span>
                    ) : (
                      <span className="title">{title || "N/A"}</span>
                    )}
                    {frontmatter.authors && (
                      <span className="authors">
                        {renderAuthors(frontmatter.authors)}
                      </span>
                    )}
                    <div className="meta">
                      {venue && <span className="chip">{venue}</span>}
                      {formatted && <span className="date">{formatted}</span>}
                      {frontmatter.arxiv && (
                        <a
                          href={frontmatter.arxiv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="chip-link"
                          title="arXiv"
                          aria-label={`Open arXiv for ${title}`}
                        >
                          <IconArxiv />
                          <span>arxiv</span>
                        </a>
                      )}
                      {frontmatter.paperurl &&
                        (!isArxivPdf || !frontmatter.arxiv) && (
                          <a
                            href={frontmatter.paperurl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="chip-link"
                            title="PDF"
                            aria-label={`Open PDF for ${title}`}
                          >
                            <IconExternal />
                            <span>pdf</span>
                          </a>
                        )}
                      {frontmatter.slides && (
                        <a
                          href={withPrefix(frontmatter.slides)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="chip-link"
                          title="Slides"
                          aria-label={`Open slides for ${title}`}
                        >
                          <IconSlides />
                          <span>slides</span>
                        </a>
                      )}
                      {frontmatter.code && (
                        <a
                          href={frontmatter.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="chip-link"
                          title="Code"
                          aria-label={`Open code repository for ${title}`}
                        >
                          <IconGitHub />
                          <span>code</span>
                        </a>
                      )}
                      {frontmatter.slug && (
                        <Link
                          to={frontmatter.slug}
                          className="chip-link"
                          aria-label={`More details for ${title}`}
                        >
                          <span>details</span>
                          <IconChevronRight />
                        </Link>
                      )}
                    </div>
                  </PublicationListItem>
                )
              }

              const isJob = activeContentType === "jobs"
              const cardTitle = isJob ? title : frontmatter.degree
              const cardSubtitle = isJob ? company : venue
              const range = frontmatter.range
              const gpa = frontmatter.gpa
              const technologies = frontmatter.technologies
              const html = node.html
              const cardKey = `${activeContentType}-${i}`
              const bulletCount = countBullets(html)
              const isCollapsible = bulletCount > 4
              const isExpanded = !!expandedCards[cardKey]

              return (
                <EntryListItem key={i}>
                  <span className="title">{cardTitle || "N/A"}</span>
                  {cardSubtitle && (
                    <span className="subtitle">{cardSubtitle}</span>
                  )}
                  {(range || gpa) && (
                    <div className="meta">
                      {range && <span className="chip">{range}</span>}
                      {gpa && <span className="chip">GPA {gpa}</span>}
                    </div>
                  )}
                  {html && (
                    <div
                      className={`body${
                        isCollapsible && !isExpanded ? " collapsed" : ""
                      }`}
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  )}
                  {isCollapsible && (
                    <button
                      className={`card-toggle${isExpanded ? " expanded" : ""}`}
                      onClick={() => toggleCard(cardKey)}
                    >
                      <span>{isExpanded ? "Show less" : "Show more"}</span>
                      <IconChevronRight />
                    </button>
                  )}
                  {!isJob && technologies && technologies.length > 0 && (
                    <div className="coursework">
                      <button
                        className={`coursework-toggle${
                          showCourses[i] ? " expanded" : ""
                        }`}
                        onClick={() => toggleCourses(i)}
                      >
                        <span>
                          {showCourses[i]
                            ? "Hide coursework"
                            : "Show coursework"}
                        </span>
                        <IconChevronRight />
                      </button>
                      {showCourses[i] && (
                        <p className="coursework-list">
                          {technologies.map(tech => tech.name).join(" · ")}
                        </p>
                      )}
                    </div>
                  )}
                </EntryListItem>
              )
            })}
          </StyledTabList>

          {activeContentType === "publications" && hasMorePubs && (
            <ShowAllButton onClick={() => setShowAllPubs(!showAllPubs)}>
              {showAllPubs
                ? "Show less"
                : `Show all ${filteredPublications.length} publications`}
            </ShowAllButton>
          )}
        </div>
      </StyledText>
    </StyledJobsSection>
  )
}

export default Experience
