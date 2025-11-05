import React, { useState, useEffect, useRef } from "react"
import { useStaticQuery, graphql, Link, withPrefix } from "gatsby"
import { CSSTransition } from "react-transition-group"
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
  gap: 10px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto 30px;
  padding: 0 20px;
`

const ContentTypeButton = styled.button`
  background: ${props =>
    props.isActive ? "var(--green-tint)" : "transparent"};
  color: ${props => (props.isActive ? "var(--green)" : "var(--slate)")};
  border: 1px solid
    ${props => (props.isActive ? "var(--green)" : "var(--lightest-navy)")};
  border-radius: var(--border-radius);
  padding: 10px 18px;
  font-size: var(--fz-xs);
  font-family: var(--font-mono);
  font-weight: ${props => (props.isActive ? "600" : "500")};
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: ${props => (props.isActive ? "default" : "pointer")};
  position: relative;
  min-width: 90px;
  flex: 1 1 auto;
  text-align: center;

  @media (max-width: 768px) {
    flex: 0 1 calc(50% - 5px);
    min-width: 120px;
  }

  &:hover:not(:disabled) {
    color: var(--green);
    background: var(--green-tint);
    border-color: var(--green);
    transform: translateY(-2px);
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
    if (activeTabId < activeData.length - 1) {
      setActiveTabId(activeTabId + 1)
    }
  }

  return (
    <StyledJobsSection id="experience" ref={revealContainer}>
      <StyledText>
        <h3>Hey, I&apos;m Jake.</h3>
        <div
          style={{
            fontSize: "var(--fz-lg)",
            color: "var(--light-slate)",
            lineHeight: "1.6",
            fontWeight: "normal",
            marginBottom: "20px",
            maxWidth: "600px",
            margin: "0 auto 20px",
          }}
        >
          I have spent close to ten years in Data Science and Machine Learning
          Engineering roles, primarily in fintech. I&apos;m currently pursuing
          my PhD while conducting research in LLM Reasoning and Alignment at{" "}
          <a
            href="https://arc-asu.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--green)",
              textDecoration: "none",
              fontWeight: "600",
              transition: "all 0.25s ease",
            }}
          >
            Arizona State University&apos;s ARC Lab
          </a>
          .
        </div>
        <div
          style={{
            fontSize: "var(--fz-lg)",
            color: "var(--light-slate)",
            lineHeight: "1.6",
            fontWeight: "normal",
            marginBottom: "30px",
            maxWidth: "600px",
            margin: "0 auto 30px",
          }}
        >
          Outside of work, I enjoy traveling with my wife, spending time with
          family and friends, tinkering with tech, and staying active despite
          the Arizona heat.
        </div>

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

            {activeData.map(({ node }, i) => {
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

          <StyledTabPanels>
            {activeData.map(({ node }, i) => {
              const { frontmatter, html } = node
              const { title, range, technologies } = frontmatter

              return (
                <CSSTransition
                  key={i}
                  in={activeTabId === i}
                  timeout={250}
                  classNames="fade"
                  unmountOnExit
                >
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? "0" : "-1"}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}
                    style={{
                      borderBottom: "1px solid var(--lightest-navy)",
                      paddingBottom: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1rem", // Reduced from 1.1rem
                        fontWeight: "600",
                        marginBottom: "5px",
                      }}
                    >
                      {activeContentType === "publications" &&
                      frontmatter.slug ? (
                        <Link
                          to={frontmatter.slug}
                          style={{
                            color: "var(--lightest-slate)",
                            textDecoration: "none",
                            transition: "color 0.25s",
                          }}
                          onMouseEnter={e =>
                            (e.target.style.color = "var(--green)")
                          }
                          onMouseLeave={e =>
                            (e.target.style.color = "var(--lightest-slate)")
                          }
                        >
                          {title}
                        </Link>
                      ) : (
                        <span>{title}</span>
                      )}
                      {frontmatter.venue && (
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--green)",
                            fontFamily: "var(--font-mono)",
                            marginLeft: "10px",
                          }}
                        >
                          {frontmatter.venue}
                        </span>
                      )}
                    </h3>

                    {/* Authors and extra body hidden now to keep the list clean per request */}
                    {activeContentType === "education" && (
                      <>
                        <h3
                          style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            marginBottom: "5px",
                            textAlign: "center",
                          }}
                        >
                          {frontmatter.degree}
                        </h3>

                        <p
                          style={{
                            fontSize: "0.95rem",
                            color: "var(--light-slate)",
                            marginTop: "2px",
                            textAlign: "center",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          GPA: {frontmatter.gpa}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "10px",
                            marginTop: "15px",
                          }}
                        >
                          <button
                            onClick={() => toggleCourses(i)}
                            style={{
                              backgroundColor: "#112240",
                              color: "#64ffda",
                              borderRadius: "5px",
                              padding: "5px 10px",
                              fontSize: "0.75rem",
                              border: "none",
                              transition: "all 0.2s ease-in-out",
                              cursor: "pointer",
                            }}
                            onMouseOver={e => {
                              e.target.style.backgroundColor = "#1d3b6f"
                            }}
                            onMouseOut={e => {
                              e.target.style.backgroundColor = "#112240"
                            }}
                          >
                            {showCourses[i] ? "Hide Courses" : "Show Courses"}
                          </button>
                        </div>

                        {showCourses[i] &&
                          technologies &&
                          technologies.length > 0 && (
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "8px",
                                justifyContent: "center",
                                marginTop: "15px",
                                padding: "0 20px",
                                maxWidth: "600px",
                                margin: "15px auto",
                              }}
                            >
                              {technologies.map((tech, index) => (
                                <>
                                  <span
                                    key={index}
                                    style={{
                                      color: "var(--slate)",
                                      fontSize: "0.75rem",
                                      fontFamily: "var(--font-mono)",
                                    }}
                                  >
                                    {tech.name}
                                  </span>
                                  {index < technologies.length - 1 && (
                                    <span
                                      style={{
                                        color: "var(--green)",
                                        fontSize: "0.75rem",
                                        opacity: "0.5",
                                        margin: "0 4px",
                                      }}
                                    >
                                      /
                                    </span>
                                  )}
                                </>
                              ))}
                            </div>
                          )}
                      </>
                    )}
                    {activeContentType === "publications" &&
                      frontmatter.slug && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "15px",
                          }}
                        >
                          <Link
                            to={frontmatter.slug}
                            style={{
                              color: "var(--green)",
                              textDecoration: "none",
                              fontFamily: "var(--font-mono)",
                              fontSize: "var(--fz-sm)",
                              transition: "all 0.25s",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                            onMouseEnter={e => {
                              e.target.style.transform = "translateX(5px)"
                            }}
                            onMouseLeave={e => {
                              e.target.style.transform = "translateX(0)"
                            }}
                          >
                            View Publication Details →
                          </Link>
                        </div>
                      )}
                    <p className="range">{range}</p>

                    <div dangerouslySetInnerHTML={{ __html: html }} />
                    {activeContentType !== "education" && (
                      <TechTagsContainer>
                        {technologies &&
                          technologies.map((tech, index) => (
                            <TechTag
                              key={index}
                              href={tech.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ "--index": index }}
                            >
                              {tech.name}
                            </TechTag>
                          ))}
                      </TechTagsContainer>
                    )}
                  </StyledTabPanel>
                </CSSTransition>
              )
            })}
          </StyledTabPanels>
        </div>
      </StyledText>
    </StyledJobsSection>
  )
}

export default Experience
