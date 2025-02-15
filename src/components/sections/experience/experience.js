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
                url
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
                url
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
                url
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
                url
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
            fontFamily: "Arial, sans-serif", // Or use another font
            fontSize: "0.75em",
            fontWeight: "600",
            color: "#4a90e2", // Cool blue color
            textAlign: "center",
            marginBottom: "20px",
            borderBottom: "2px solid #4a90e2", // Underline with color
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
        <h1>
          I am passionate about Machine Learning & Deep Learning and have spent
          close to ten years working in various Data Science and Machine
          Learning Engineering roles, mostly within the fintech sector.
          Additionally, I&apos;ve engaged in academic research across several
          institutions in pursuit of my PhD, collecting Master of Science
          degrees in DS and CS along the way.
        </h1>
        <h1>
          I am currently working as part of the AI, Reasoning and Cognition
          (ARC) Lab at Arizona State University (under), with a focus on LLM
          Reasoning and Alignment.
        </h1>
        <h1>
          I love planning trips to explore the world with my wife, spending
          quality time with the guys or my family, tinkering with my computers
          or speakers, and finding ways to stay active in the Arizona heat.
        </h1>

        <h1 className="numbered-heading">A little about me</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={() => setActiveContentType("education")}
            disabled={activeContentType === "education"}
            aria-pressed={activeContentType === "education"}
            style={{
              backgroundColor:
                activeContentType === "education" ? "#89CFEF" : "#f8f9fa",
              color: activeContentType === "education" ? "#000000" : "#212529",
              border: "3px solid",
              borderColor:
                activeContentType === "education" ? "#000000" : "#ced4da",
              borderRadius: "50px",
              padding: "5px 5px",
              margin: "0 5px",
              fontSize: "0.65rem",
              fontWeight: "800",
              fontFamily: "var(--font-mono)",
              transition: "all .5s ease",
              outline: "none",
            }}
          >
            Education
          </button>
          <button
            onClick={() => setActiveContentType("publications")}
            disabled={activeContentType === "publications"}
            aria-pressed={activeContentType === "publications"}
            style={{
              backgroundColor:
                activeContentType === "publications" ? "#89CFEF" : "#f8f9fa",
              color:
                activeContentType === "publications" ? "#000000" : "#212529",
              border: "3px solid",
              borderColor:
                activeContentType === "publications" ? "#000000" : "#ced4da",
              borderRadius: "20px",
              padding: "5px 5px",
              margin: "0 5px",
              fontSize: "0.65rem",
              fontWeight: "800",
              fontFamily: "var(--font-mono)",
              transition: "all .5s ease",
              outline: "none",
            }}
          >
            Publications
          </button>

          <button
            onClick={() => setActiveContentType("rjobs")}
            disabled={activeContentType === "rjobs"}
            aria-pressed={activeContentType === "rjobs"}
            style={{
              backgroundColor:
                activeContentType === "rjobs" ? "#89CFEF" : "#f8f9fa",
              color: activeContentType === "rjobs" ? "#000000" : "#212529",
              border: "3px solid",
              borderColor:
                activeContentType === "rjobs" ? "#000000" : "#ced4da",
              borderRadius: "20px",
              padding: "5px 5px",
              margin: "0 5px",
              fontSize: "0.65rem",
              fontWeight: "80px",
              fontFamily: "var(--font-mono)",
              transition: "all .5s ease",
              outline: "none",
            }}
          >
            Research Jobs
          </button>
          <button
            onClick={() => setActiveContentType("jobs")}
            disabled={activeContentType === "jobs"}
            aria-pressed={activeContentType === "jobs"}
            style={{
              backgroundColor:
                activeContentType === "jobs" ? "#89CFEF" : "#f8f9fa",
              color: activeContentType === "jobs" ? "#000000" : "#212529",
              border: "3px solid",
              borderColor: activeContentType === "jobs" ? "#000000" : "#ced4da",
              borderRadius: "20px",
              padding: "5px 5px",
              margin: "0 5px",
              fontSize: "0.65rem",
              fontWeight: "800",
              fontFamily: "var(--font-mono)",
              transition: "all .5s ease",
              outline: "none",
            }}
          >
            Jobs
          </button>
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
                  >
                    <h3>
                      <span>{title}</span>
                      <span className="company"></span>
                    </h3>

                    {frontmatter.authors && (
                      <p className="authors">Authors: {frontmatter.authors}</p>
                    )}
                    {activeContentType === "education" && (
                      <>
                        <h3>{frontmatter.degree}</h3>
                        <h1>{frontmatter.gpa}</h1>
                        <button
                          onClick={() => toggleCourses(i)}
                          style={{
                            backgroundColor: "#112240",
                            color: "#64ffda",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            margin: "10px 0",
                            fontSize: "0.75rem",
                            border: "none",
                          }}
                        >
                          {showCourses[i] ? "Hide Courses" : "Show Courses"}
                        </button>
                        {showCourses[i] && (
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
                      </>
                    )}
                    {activeContentType === "publications" && (
                      <>
                        <button
                          onClick={() => toggleAbstract(i)}
                          style={{
                            backgroundColor: "#112240",
                            color: "#64ffda",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            margin: "10px 0",
                            fontSize: "0.75rem",
                            border: "none",
                          }}
                        >
                          {showAbstract[i] ? "Hide Abstract" : "Show Abstract"}
                        </button>
                        {showAbstract[i] && (
                          <p className="abstract">{abstract}</p>
                        )}

                        <button
                          onClick={() => handleBibTeXPopup(bibtex)}
                          style={{
                            backgroundColor: "#112240",
                            color: "#64ffda",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            margin: "10px 0",
                            fontSize: "0.75rem",
                            border: "none",
                          }}
                        >
                          Show BibTeX
                        </button>
                      </>
                    )}
                    <IconContainer>
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
        />
      )}
    </StyledJobsSection>
  )
}

export default Experience
