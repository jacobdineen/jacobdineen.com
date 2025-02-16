import React, { useState, useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { CSSTransition } from "react-transition-group"
// import styled from "styled-components";
import { srConfig } from "@config"
import { KEY_CODES } from "@utils"
import sr from "@utils/sr"
import { usePrefersReducedMotion } from "@hooks"
import { Icon } from "@components/icons"
import StyledTabButton from "./StyledTabButton"
import BibTeXPopup from "./BibTeXPopup"
import StyledText from "./StyledText"
import TechTagsContainer from "./TechTagsContainer"
import IconContainer from "./IconContainer"
import StyledJobsSection from "./StyledJobsSection"
import TechTag from "./TechTag"
import IconLink from "./IconLink"
import StyledTabList from "./StyledTabList"
import ArrowButton from "./ArrowButton"
import StyledTabPanels from "./StyledTabPanels"
import StyledTabPanel from "./StyledTabPanel"

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
              authors
              date
              venue
              arxiv
              googlescholar
              semanticscholar
              paperurl
              code
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
  const [activeContentType, setActiveContentType] = useState("education")
  const [showAbstract, setShowAbstract] = useState({})
  const [showCourses, setShowCourses] = useState({})
  const [showBibtexPopup, setShowBibtexPopup] = useState(null) // New state for BibTeX popup

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

  const toggleAbstract = i => {
    setShowAbstract(prevState => ({
      ...prevState,
      [i]: !prevState[i],
    }))
  }

  const toggleCourses = i => {
    setShowCourses(prevState => ({
      ...prevState,
      [i]: !prevState[i],
    }))
  }

  const handleBibTeXPopup = bibtex => {
    setShowBibtexPopup(bibtex)
  }

  const handleCloseBibTeXPopup = () => {
    setShowBibtexPopup(null)
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
            fontFamily: "Arial, sans-serif",
            fontSize: "0.75em",
            fontWeight: "600",
            color: "#4a90e2",
            textAlign: "center",
            marginBottom: "20px",
            borderBottom: "2px solid #4a90e2",
            paddingBottom: "10px",
          }}
        >
          Currently @:{" "}
          <a
            href="https://arc-asu.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>AI, Reasoning and Cognition (ARC) Lab</span>
          </a>
        </div>
        <h1 style={{
          fontSize: '0.95rem',
          color: 'var(--light-slate)',
          lineHeight: '1.5',
          fontWeight: 'normal',
          marginBottom: '15px'
        }}>
          I have spent close to ten years in Data Science and Machine Learning Engineering roles, 
          primarily in fintech. I'm currently pursuing my PhD while conducting research in LLM Reasoning 
          and Alignment at Arizona State University's ARC Lab.
        </h1>
        <h1 style={{
          fontSize: '0.95rem',
          color: 'var(--light-slate)',
          lineHeight: '1.5',
          fontWeight: 'normal',
          marginBottom: '15px'
        }}>
          Outside of work, I enjoy traveling with my wife, spending time with family and friends, 
          tinkering with tech, and staying active despite the Arizona heat.
        </h1>

        <h1 className="numbered-heading">A little about me</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto 25px",
            padding: "0 20px"
          }}
        >
          {[
            { id: "education", label: "Education" },
            { id: "publications", label: "Publications" },
            { id: "rjobs", label: "Research" },
            { id: "jobs", label: "Industry" }
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveContentType(id)}
              disabled={activeContentType === id}
              style={{
                background: activeContentType === id ? "var(--green-tint)" : "transparent",
                color: activeContentType === id ? "var(--green)" : "var(--slate)",
                border: `1px solid ${activeContentType === id ? "var(--green)" : "transparent"}`,
                borderRadius: "4px",
                padding: "8px 16px",
                fontSize: "13px",
                fontFamily: "var(--font-mono)",
                transition: "all 0.25s cubic-bezier(0.645,0.045,0.355,1)",
                cursor: "pointer",
                position: "relative",
                "&:hover": {
                  color: "var(--green)",
                  background: "var(--green-tint)",
                },
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  transform: "scaleX(0)",
                  height: "1px",
                  bottom: "-2px",
                  left: "0",
                  background: "var(--green)",
                  transformOrigin: "bottom right",
                  transition: "transform 0.25s ease-out"
                },
                "&:hover:after": {
                  transform: "scaleX(1)",
                  transformOrigin: "bottom left"
                }
              }}
            >
              {label}
            </button>
          ))}
        </div>

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
              const { company, venue } = frontmatter

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
              const { title, range, abstract, bibtex, technologies } =
                frontmatter

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
                      marginBottom: "20px"
                    }}
                  >
                    <h3 style={{
                      fontSize: '1rem',  // Reduced from 1.1rem
                      fontWeight: '600',
                      marginBottom: '5px'
                    }}>
                      <span>{title}</span>
                      {frontmatter.venue && (
                        <span style={{
                          fontSize: '0.8rem',
                          color: 'var(--green)',
                          fontFamily: 'var(--font-mono)',
                          marginLeft: '10px'
                        }}>
                          {frontmatter.venue}
                        </span>
                      )}
                    </h3>

                    {frontmatter.authors && (
                      <p className="authors" style={{
                        fontSize: '0.95rem',
                        color: 'var(--light-slate)',
                        marginTop: '2px'
                      }}>
                        {frontmatter.authors}
                      </p>
                    )}
                    {activeContentType === "education" && (
                      <>
                        <h3 style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          marginBottom: '5px',
                          textAlign: 'center'
                        }}>
                          {frontmatter.degree}
                        </h3>
                        
                        <p style={{
                          fontSize: '0.95rem',
                          color: 'var(--light-slate)',
                          marginTop: '2px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          GPA: {frontmatter.gpa}
                        </p>

                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '10px',
                          marginTop: '15px'
                        }}>
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
                              cursor: "pointer"
                            }}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = "#1d3b6f"
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = "#112240"
                            }}
                          >
                            {showCourses[i] ? "Hide Courses" : "Show Courses"}
                          </button>
                        </div>

                        {showCourses[i] && technologies && technologies.length > 0 && (
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            justifyContent: 'center',
                            marginTop: '15px',
                            padding: '0 20px',
                            maxWidth: '600px',
                            margin: '15px auto'
                          }}>
                            {technologies.map((tech, index) => (
                              <>
                                <span
                                  key={index}
                                  style={{
                                    color: 'var(--slate)',
                                    fontSize: '0.75rem',
                                    fontFamily: 'var(--font-mono)'
                                  }}
                                >
                                  {tech.name}
                                </span>
                                {index < technologies.length - 1 && (
                                  <span style={{
                                    color: 'var(--green)',
                                    fontSize: '0.75rem',
                                    opacity: '0.5',
                                    margin: '0 4px'
                                  }}>
                                    /
                                  </span>
                                )}
                              </>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                    {activeContentType === "publications" && (
                      <>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: '10px',
                          marginTop: '15px'
                        }}>
                          <button
                            onClick={() => toggleAbstract(i)}
                            style={{
                              backgroundColor: "#112240",
                              color: "#64ffda",
                              borderRadius: "5px",
                              padding: "5px 10px",
                              fontSize: "0.75rem",
                              border: "none",
                              transition: "all 0.2s ease-in-out",
                              cursor: "pointer"
                            }}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = "#1d3b6f"
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = "#112240"
                            }}
                          >
                            {showAbstract[i] ? "Hide Abstract" : "Show Abstract"}
                          </button>

                          <button
                            onClick={() => handleBibTeXPopup(bibtex)}
                            style={{
                              backgroundColor: "#112240",
                              color: "#64ffda",
                              borderRadius: "5px",
                              padding: "5px 10px",
                              fontSize: "0.75rem",
                              border: "none",
                              transition: "all 0.2s ease-in-out",
                              cursor: "pointer"
                            }}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = "#1d3b6f"
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = "#112240"
                            }}
                          >
                            Show BibTeX
                          </button>
                        </div>
                        
                        {showAbstract[i] && (
                          <p className="abstract" style={{
                            fontSize: '0.9rem',
                            lineHeight: '1.5',
                            color: 'var(--slate)',
                            marginTop: '10px',
                            maxWidth: '100%',
                            padding: '0 15px',
                            textAlign: 'justify',
                            overflowWrap: 'break-word',
                            '@media (max-width: 768px)': {
                              padding: '0 10px',
                              fontSize: '0.85rem'
                            }
                          }}>
                            {abstract}
                          </p>
                        )}
                      </>
                    )}
                    <IconContainer style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '15px',
                      marginTop: '15px'
                    }}>
                      {frontmatter.googlescholar && (
                        <IconLink
                          href={frontmatter.googlescholar}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="gscholar"
                        >
                          <Icon name="GScholar" />
                        </IconLink>
                      )}
                      {frontmatter.arxiv && (
                        <IconLink
                          href={frontmatter.arxiv}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="arXiv"
                        >
                          <Icon name="Arxiv" />
                        </IconLink>
                      )}
                      {frontmatter.semanticscholar && (
                        <IconLink
                          href={frontmatter.semanticscholar}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Semantic Scholar"
                        >
                          <Icon name="SemanticScholar" />
                        </IconLink>
                      )}
                      {frontmatter.paperurl && (
                        <IconLink
                          href={frontmatter.paperurl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Paper URL"
                        >
                          <Icon name="External" />
                        </IconLink>
                      )}
                      {frontmatter.code && (
                        <IconLink
                          href={frontmatter.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Code Repository"
                        >
                          <Icon name="GitHub" />
                        </IconLink>
                      )}
                    </IconContainer>
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
      {showBibtexPopup && (
        <BibTeXPopup
          bibtex={showBibtexPopup}
          onClose={handleCloseBibTeXPopup}
          style={{
            maxWidth: '90vw',
            margin: '0 auto',
            padding: '15px',
            '@media (max-width: 768px)': {
              maxWidth: '95vw',
              padding: '10px',
              fontSize: '0.85rem'
            }
          }}
        />
      )}
    </StyledJobsSection>
  )
}

export default Experience
