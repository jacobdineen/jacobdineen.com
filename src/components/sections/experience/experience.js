import React, { useState, useEffect, useRef, useMemo } from "react"
import { useStaticQuery, graphql, Link, withPrefix } from "gatsby"
import styled from "styled-components"
import { srConfig } from "@config"
import { KEY_CODES } from "@utils"
import sr from "@utils/sr"
import { usePrefersReducedMotion } from "@hooks"
import StyledTabButton from "./StyledTabButton"
import StyledText from "./StyledText"
import TechTagsContainer from "./TechTagsContainer"
import StyledJobsSection from "./StyledJobsSection"
import TechTag from "./TechTag"
import StyledTabList from "./StyledTabList"
import ArrowButton from "./ArrowButton"
import StyledTabPanels from "./StyledTabPanels"
import StyledTabPanel from "./StyledTabPanel"
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
  gap: 8px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 24px;
  padding: 4px;
  background: ${({ theme }) =>
    theme.mode === "light" ? "#f5f5f7" : "#1d1d1f"};
  border-radius: 10px;
`

const ContentTypeButton = styled.button`
  background: ${({ isActive }) => (isActive ? "#0071e3" : "transparent")};
  color: ${({ isActive, theme }) =>
    isActive ? "#ffffff" : theme.mode === "light" ? "#6e6e73" : "#86868b"};
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 0.82rem;
  font-family: var(--font-sans);
  font-weight: 500;
  transition: background-color 0.15s ease, color 0.15s ease;
  cursor: ${props => (props.isActive ? "default" : "pointer")};
  flex: 1 1 auto;
  text-align: center;

  &:hover:not(:disabled) {
    color: ${({ isActive, theme }) =>
      isActive ? "#ffffff" : theme.mode === "light" ? "#1d1d1f" : "#f5f5f7"};
  }

  @media (max-width: 480px) {
    padding: 7px 12px;
    font-size: 0.78rem;
  }
`

const StyledFilters = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px 120px;
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
      color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
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
  color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
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
              location
              range
              technologies {
                name
              }
            }
            html
          }
        }
      }
      rjobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/research/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
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
  const rjobsData = data.rjobs.edges
  const publicationsData = data.publications.edges
  const educationData = data.education.edges
  const [activeTabId, setActiveTabId] = useState(0)
  const [tabFocus, setTabFocus] = useState(null)
  const tabs = useRef([])
  const revealContainer = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeContentType, setActiveContentType] = useState("publications")
  const [showCourses, setShowCourses] = useState({})
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

  // Keep active index valid when filters/content type change
  useEffect(() => {
    if (activeContentType === "publications") {
      setActiveTabId(0)
    }
  }, [pubQuery, pubYear, pubVenue, activeContentType])

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    sr.reveal(revealContainer.current, srConfig())
  }, [prefersReducedMotion])

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus()
      return
    }
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0)
    }
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1)
    }
  }

  useEffect(() => focusTab(), [tabFocus])

  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_LEFT: {
        e.preventDefault()
        setTabFocus(tabFocus - 1)
        break
      }
      case KEY_CODES.ARROW_RIGHT: {
        e.preventDefault()
        setTabFocus(tabFocus + 1)
        break
      }
      default: {
        break
      }
    }
  }

  const activeData =
    activeContentType === "jobs"
      ? jobsData
      : activeContentType === "rjobs"
      ? rjobsData
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

  const handlePrevClick = () => {
    if (activeTabId > 0) {
      setActiveTabId(activeTabId - 1)
    }
  }

  const handleNextClick = () => {
    if (activeTabId < displayData.length - 1) {
      setActiveTabId(activeTabId + 1)
    }
  }

  return (
    <StyledJobsSection id="experience" ref={revealContainer}>
      <StyledText>
        <h3>Hey, I&apos;m Jake.</h3>
        <IntroText>
          I have spent close to ten years in Data Science and Machine Learning
          Engineering roles, primarily in fintech. I&apos;m currently pursuing
          my PhD while conducting research in LLM Reasoning and Alignment at{" "}
          <a
            href="https://arc-asu.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arizona State University&apos;s ARC Lab
          </a>
          .
        </IntroText>
        <IntroText>
          Outside of work, I enjoy traveling with my wife, spending time with
          family and friends, tinkering with tech, and staying active despite
          the Arizona heat.
        </IntroText>

        <h1 className="numbered-heading">A little about me</h1>

        <ContentTypeButtonsContainer>
          {[
            { id: "publications", label: "Publications" },
            { id: "rjobs", label: "Research" },
            { id: "education", label: "Education" },
            { id: "jobs", label: "Industry" },
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
          <StyledTabList
            role="tablist"
            aria-label="Job tabs"
            onKeyDown={onKeyDown}
          >
            <ArrowButton
              onClick={handlePrevClick}
              disabled={activeTabId === 0}
              aria-label="Previous Tab"
            >
              &larr;
            </ArrowButton>

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
                  <PublicationListItem
                    key={i}
                    isActive={activeTabId === i}
                    onClick={() => setActiveTabId(i)}
                    ref={el => (tabs.current[i] = el)}
                    id={`tab-${i}`}
                    role="tab"
                    tabIndex={activeTabId === i ? "0" : "-1"}
                    aria-selected={activeTabId === i ? true : false}
                    aria-controls={`panel-${i}`}
                  >
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
                        </a>
                      )}
                      {frontmatter.slug && (
                        <Link to={frontmatter.slug} className="chip-link">
                          <IconChevronRight />
                        </Link>
                      )}
                    </div>
                  </PublicationListItem>
                )
              }

              const label =
                activeContentType === "jobs" || activeContentType === "rjobs"
                  ? company
                  : venue

              return (
                <StyledTabButton
                  key={i}
                  isActive={activeTabId === i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role="tab"
                  tabIndex={activeTabId === i ? "0" : "-1"}
                  aria-selected={activeTabId === i ? true : false}
                  aria-controls={`panel-${i}`}
                >
                  <span>{label || "N/A"}</span>
                </StyledTabButton>
              )
            })}

            <ArrowButton
              onClick={handleNextClick}
              disabled={activeTabId === activeData.length - 1}
              aria-label="Next Tab"
            >
              &rarr;
            </ArrowButton>
          </StyledTabList>

          {activeContentType === "publications" && hasMorePubs && (
            <ShowAllButton onClick={() => setShowAllPubs(!showAllPubs)}>
              {showAllPubs
                ? "Show less"
                : `Show all ${filteredPublications.length} publications`}
            </ShowAllButton>
          )}

          {/* Only show detail panels for non-publication content types */}
          {activeContentType !== "publications" &&
            displayData[activeTabId] &&
            (() => {
              const { frontmatter, html } = displayData[activeTabId].node
              const { title, range, technologies } = frontmatter

              return (
                <StyledTabPanels>
                  <StyledTabPanel
                    id={`panel-${activeTabId}`}
                    role="tabpanel"
                    tabIndex="0"
                    aria-labelledby={`tab-${activeTabId}`}
                  >
                    <h3>{title}</h3>

                    {activeContentType === "education" && (
                      <>
                        <p className="edu-degree">{frontmatter.degree}</p>
                        {frontmatter.gpa && (
                          <p className="edu-meta">GPA: {frontmatter.gpa}</p>
                        )}
                      </>
                    )}

                    <p className="range">{range}</p>

                    <div dangerouslySetInnerHTML={{ __html: html }} />

                    {activeContentType === "education" &&
                      technologies &&
                      technologies.length > 0 && (
                        <div className="coursework">
                          <button
                            className="coursework-toggle"
                            onClick={() => toggleCourses(activeTabId)}
                          >
                            {showCourses[activeTabId]
                              ? "Hide coursework"
                              : "Show coursework"}
                          </button>
                          {showCourses[activeTabId] && (
                            <p className="coursework-list">
                              {technologies.map(tech => tech.name).join(" · ")}
                            </p>
                          )}
                        </div>
                      )}

                    {activeContentType !== "education" && (
                      <TechTagsContainer>
                        {technologies &&
                          technologies.map((tech, index) => (
                            <TechTag
                              key={index}
                              href={tech.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {tech.name}
                            </TechTag>
                          ))}
                      </TechTagsContainer>
                    )}
                  </StyledTabPanel>
                </StyledTabPanels>
              )
            })()}
        </div>
      </StyledText>
    </StyledJobsSection>
  )
}

export default Experience
