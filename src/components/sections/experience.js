import React, { useState, useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import { srConfig } from "@config"
import { KEY_CODES } from "@utils"
import sr from "@utils/sr"
import { usePrefersReducedMotion } from "@hooks"
import { Icon } from "@components/icons"

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem; /* Added padding for better spacing */
  margin: 0;

  h1 {
    font-size: 1rem; /* Increased font size for better readability */
    font-weight: 1000;
    color: #ccd6f6;
    margin: 0 0 20px 0;
    line-height: 1.2; /* Added line height for better readability */
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;
    list-style-position: outside;
  }

  li {
    font-size: 0.875rem; /* Increased font size for better readability */
    margin: 0.5rem 0; /* Increased margin for better spacing */
    padding: 0.25rem 0;
    overflow-wrap: break-word;
    word-break: break-word;
    line-height: 1.4; /* Added line height for better readability */

    &:before {
      content: "•"; /* Added bullet points */
      color: var(--green);
      font-size: 1.05rem;
      line-height: 0.75rem;
      margin-right: 0.35rem;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem; /* Ensure padding for smaller screens */

    h1 {
      font-size: 0.875rem; /* Adjusted font size for medium screens */
    }

    li {
      font-size: 0.75rem; /* Adjusted font size for medium screens */
    }
  }

  @media (max-width: 480px) {
    padding: 1rem; /* Ensure padding for smaller screens */

    h1 {
      font-size: 0.75rem; /* Adjusted font size for small screens */
    }

    li {
      font-size: 0.75rem; /* Adjusted font size for small screens */
    }
  }
`

const TechTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; // This will center the tags
  gap: 5px; // This creates a gap between the tags
`

const TechTag = styled.a`
  display: inline-flex; // Use inline-flex so that tags can be in a line and centered
  align-items: center; // Center the content of the tag
  margin: 1px; // Provides space between tags, adjust as necessary
  padding: 1px 10px; // Adjust padding as needed
  font-size: 0.75em; // Adjust the font size as needed
  background-color: #112240; // The tag background color
  color: #64ffda; // The tag text color
  border-radius: 2px; // Rounded corners
  text-decoration: none; // Remove underline from the link
  transition: background-color 0.3s, color 0.3s; // Smooth transition for background and text color
  cursor: crosshair;
  &:hover,
  &:focus {
    background-color: #0a192f; // Darker background color on hover
    color: #fff; // White text color on hover
  }
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center; // Centers the icons horizontally in the container
  align-items: center; // Aligns the icons vertically in the center
  gap: 5px; // Adjust the gap between icons as needed
  flex-wrap: wrap; // Allows the icons to wrap to the next line if the container is too narrow
`

const IconLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit; // Adjust as needed

  svg {
    width: 30px; // Adjust the icon size as needed
    height: 30px; // Adjust the icon size as needed
    fill: currentColor; // This ensures the SVG icon inherits the color from the parent
  }
`
const StyledJobsSection = styled.section`
  max-width: 700px;
  font-size: var(--fz-lg);

  .inner {
    display: flex;
    flex-direction: column; // Stack items vertically
    align-items: flex-start; // Align items to the start
  }

  ul.fancy-list li {
    font-size: 0.4rem;
    &:before {
      font-size: 0.64rem;
    }
  }

  @media (max-width: 768px) {
    font-size: var(--fz-xs);
  }

  @media (max-width: 600px) {
    margin-left: 0;
    padding: 0 10px;
    font-size: var(--fz-sm);
  }
`

const StyledTabList = styled.div`
  display: flex;
  justify-content: flex-start;
  max-width: 100%;
  position: relative;
  padding: 50px 0;
  font-size: var(--fz-lg);

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`

const StyledTabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--green);
  font-size: var(--fz-xs);
  width: auto;
  height: var(--tab-height);
  border-bottom: 2px solid var(--lightest-navy);
  background-color: transparent;
  text-align: center;
  box-sizing: border-box;
  padding: 0 20px;

  @media (max-width: 600px) {
    width: 100%;
    padding: 10px 0;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`

const StyledTabPanels = styled.div`
  width: 100%;
  margin-top: 20px; // Adjust spacing to fit your needs
  padding: 0 20px; // Optional: add padding if needed
`

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0;

  @media (max-width: 768px) {
    padding: 10px 0;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 10px 0;
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-md);
    font-weight: 1000;

    .company {
      font-size: var(--fz-md);
    }
  }

  .authors,
  .venue,
  .range {
    font-size: 0.9em;
    color: #666;
    margin-bottom: 0.5rem;
  }

  ${IconContainer} {
    display: flex;
    justify-content: start;
    gap: 5px;
  }

  ${IconLink} {
    display: inline-flex;
    align-items: center;
    svg {
      width: 24px;
      height: 24px;
    }
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
  const [activeContentType, setActiveContentType] = useState("jobs") // New state for content type toggle

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    sr.reveal(revealContainer.current, srConfig())
  }, [])

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus()
      return
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0)
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1)
    }
  }

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus])

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault()
        setTabFocus(tabFocus - 1)
        break
      }

      case KEY_CODES.ARROW_DOWN: {
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
      : educationData // This line is where the update for "education" goes

  return (
    <StyledJobsSection id="experience" ref={revealContainer}>
      <StyledText>
        <h1>Hey, I&apos;m Jake.</h1>
        <h1>
          I am passionate about Machine Learning & Deep Learning and have spent
          close to ten years working in various Data Science and Machine
          Learning Engineering roles, mostly within the fintech sector.
          Additionally, I&apos;ve engaged in academic research across several
          institutions in pursuit of my PhD, collecting Master of Science
          degrees in DS and CS along the way.
        </h1>
        <h1>
          I&apos;m an avid sports fan, currently basking in the Phx Suns&apos;
          recent success (2021). I love planning trips to explore the world with
          my fiance, spending quality time with the guys or my family,
          memorizing IMDB catalogues, tinkering with my computers or speakers,
          and finding ways to stay active in the Arizona heat.
        </h1>

        <h1 className="numbered-heading">A little about me</h1>
        {/* Toggle buttons for switching between jobs and publications */}
        <div
          style={{
            display: "flex", // Enable Flexbox layout
            justifyContent: "center", // Center children horizontally in the container
            alignItems: "center", // Center children vertically in the container
            flexDirection: "row", // Stack children vertically
            width: "100%", // Adjust the width as needed, 100% for full width
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={() => setActiveContentType("jobs")}
            disabled={activeContentType === "jobs"}
            aria-pressed={activeContentType === "jobs"}
            style={{
              backgroundColor:
                activeContentType === "jobs" ? "#89CFEF" : "#f8f9fa",
              color: activeContentType === "jobs" ? "#000000" : "#212529",
              border: "3px solid",
              borderColor: activeContentType === "jobs" ? "#000000" : "#ced4da", // Border color black when active
              borderRadius: "20px",
              padding: "5px 5px",
              margin: "0 5px",
              cursor: "crosshair",
              fontSize: "0.65rem",
              fontWeight: "800",
              fontFamily: "var(--font-mono)",
              transition: "all .5s ease",
              outline: "none",
            }}
          >
            Jobs
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
                activeContentType === "rjobs" ? "#000000" : "#ced4da", // Border color black when active
              borderRadius: "20px",
              padding: "5px 5px",
              margin: "0 5px",
              cursor: "crosshair",
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
                activeContentType === "publications" ? "#000000" : "#ced4da", // Border color black when active
              borderRadius: "20px",
              padding: "5px 5px",
              margin: "0 5px",
              cursor: "crosshair",
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
            onClick={() => setActiveContentType("education")}
            disabled={activeContentType === "education"}
            aria-pressed={activeContentType === "education"}
            style={{
              backgroundColor:
                activeContentType === "education" ? "#89CFEF" : "#f8f9fa",
              color: activeContentType === "education" ? "#000000" : "#212529",
              border: "3px solid",
              borderColor:
                activeContentType === "education" ? "#000000" : "#ced4da", // Border color black when active
              borderRadius: "50px",
              padding: "5px 5px",
              margin: "0 5px",
              cursor: "crosshair",
              fontSize: "0.65rem",
              fontWeight: "800",
              fontFamily: "var(--font-mono)",
              transition: "all .5s ease",
              outline: "none",
            }}
          >
            Education
          </button>
        </div>

        <div className="inner">
          <StyledTabList
            role="tablist"
            aria-label="Job tabs"
            onKeyDown={onKeyDown}
          >
            {activeData.map(({ node }, i) => {
              const { frontmatter } = node
              const { company, venue } = frontmatter // Extract both company and venue from frontmatter

              // Determine the label based on the active content type
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
                  <span>{label || "N/A"}</span>{" "}
                  {/* Use label, and fallback to 'N/A' if neither is available */}
                </StyledTabButton>
              )
            })}
          </StyledTabList>

          <StyledTabPanels>
            {activeData.map(({ node }, i) => {
              const { frontmatter, html } = node
              const { title, range } = frontmatter // Adjust for publications

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
                    {/* Conditional rendering based on activeContentType */}
                    {activeContentType === "education" && (
                      <>
                        <h3>{frontmatter.degree}</h3>
                        <h1>{frontmatter.gpa}</h1>
                        {/* Additional education details */}
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
                    <TechTagsContainer>
                      {frontmatter.technologies &&
                        frontmatter.technologies.map((tech, index) => (
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
