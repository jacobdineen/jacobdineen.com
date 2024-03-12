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
  padding: 0;
  margin: 0;

  h1 {
    font-size: 0.75rem;
    font-weight: 75;
    font-family: var(--font-mono);
    color: #ccd6f6;
    margin: 0 0 20px 0;
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;
    list-style-position: outside;
  }

  li {
    font-size: 0.75rem;
    margin: 0.25rem 0;
    padding: 0.25rem 0;
    overflow-wrap: break-word;
    word-break: break-word;

    &:before {
      content: "▹";
      position: left;
      left: 0;
      color: var(--green);
      font-size: 0.75rem;
      line-height: 0.75rem;
      margin-right: 0.35rem;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 0.65rem;
    }

    li {
      font-size: 0.65rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;

    h1 {
      font-size: 0.6rem;
    }

    li {
      font-size: 0.6rem;
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
  gap: 10px; // Adjust the gap between icons as needed
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
  font-size: var(--fz-lg); // Set the default font size for the section here

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }

  ul.fancy-list li {
    font-size: 0.4rem; // Set a different font size for list items
    // If you want to make the bullets smaller as well, you could add:
    &:before {
      // Content and color same as you have now
      font-size: 0.64rem; // Set a different font size for list items
    }
  }
  @media (max-width: 768px) {
    font-size: var(
      --fz-xs
    ); // You can have a slightly larger font size for small tablets if needed
  }

  @media (max-width: 600px) {
    margin-left: 0; // Remove the margin for mobile screens
    padding: 0 10px; // Add some padding on the sides for mobile screens
    font-size: var(--fz-sm); // Adjust font size for readability on mobile
  }
`

const StyledTabList = styled.div`
  max-width: 700px;
  font-size: var(--fz-lg); // Set the default font size for the section here
  padding: 50px 0;

  @media (max-width: 600px) {
    flex-shrink: 0; // Prevent the tabs from shrinking
    width: var(
      --tab-width-mobile
    ); // Assign a width that works for your design on mobile
  }
`

const StyledTabButton = styled.button`
  display: flex;
  color: var(--green);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  align-items: center;
  width: var(--tab-width);
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 4px solid var(--lightest-navy);
  background-color: transparent;
  text-align: left;
  box-sizing: border-box; // Ensure padding and border are included in the element's width

  @media (max-width: 600px) {
    flex-shrink: 0; // Prevent the tabs from shrinking
    width: var(
      --tab-width-mobile
    ); // Assign a width that works for your design on mobile
    height: var(--tab-height);
    padding: 0 20px 2px;
  }

  @media (max-width: 480px) {
    width: auto; // Buttons should only be as wide as their content
    height: var(--tab-height);
    padding: 0 20px 2px;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(
    calc(${({ activeTabId }) => activeTabId} * var(--tab-height))
  );
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 768px) {
    // Adjustments for tablets if necessary
  }

  @media (max-width: 600px) {
    width: var(--tab-width); // The width should match the tab width
    height: 2px; // Assuming you want a horizontal highlight now
    transform: translateX(
      calc(${({ activeTabId }) => activeTabId} * var(--tab-width))
    ); // Move horizontally now
    top: auto; // Set to auto or a specific value if you want the bar at the bottom
    bottom: 0; // Align the highlight to the bottom of the tab button
  }
}
`

const StyledTabPanels = styled.div`
  position: flex;
  width: 100%; // Ensure it takes up the full width
  margin-left: 20px; // Space from the sidebar or any adjacent content
  font-size: var(
    --fz-xss
  ); // Small font size, make sure it's defined in your variables
  font-family: var(--font-mono); // Monospace font, also should be defined

  @media (max-width: 768px) {
    font-size: var(
      --fz-xs
    ); // You can have a slightly larger font size for small tablets if needed
  }

  @media (max-width: 600px) {
    width: 75%; // Ensure it takes up the full width
    margin-left: 0; // Remove the margin for mobile screens
    padding: 0 0px; // Add some padding on the sides for mobile screens
    font-size: var(--fz-sm); // Adjust font size for readability on mobile
    flex-shrink: 0; // Prevent the tabs from shrinking
    width: var(
      --tab-width-mobile
    ); // Assign a width that works for your design on mobile
  }
`

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 1px;
  @media (max-width: 768px) {
  }

  @media (max-width: 600px) {
    width: 75%;
    margin-left: 0; // Remove the margin for mobile screens
    padding: 0 10px; // Add some padding on the sides for mobile screens
  }
  // ul {
  //   ${({ theme }) => theme.mixins.fancyList};

  // }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xs);
    font-weight: 1000;
    line-height: 1.3;

    .company {
      color: var(--green);
      font-size: 0.75em; // Adjust the font size as needed
    }
  }

  .authors,
  .venue,
  .range {
    font-family: "Open Sans", sans-serif; // Example font family
    font-size: 0.5em; // Adjust the font size as needed
    color: #666; // Example text color
    margin-bottom: 0.5rem;
  }

  ${IconContainer} {
    display: flex;
    justify-content: start; // Align icons to the start
    gap: 10px; // Space between icons
  }

  ${IconLink} {
    display: inline-flex;
    align-items: center;
    svg {
      width: 24px; // Adjust icon size
      height: 24px; // Adjust icon size
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
    }
  `)

  const jobsData = data.jobs.edges
  const rjobsData = data.rjobs.edges
  const publicationsData = data.publications.edges
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
      : publicationsData
  return (
    <StyledJobsSection id="experience" ref={revealContainer}>
      <StyledText>
        <h1>
          I am passionate about Machine Learning & Deep Learning, but have
          focused mainly on eXplainable Artificial Intelligence and Multi-agent
          Systems academically, and Recommender Systems professionally. If
          interested, please reach out to me via one of the methods noted to the
          left (email/linkedin).
        </h1>

        <h1 className="numbered-heading">A little about me</h1>
        {/* Toggle buttons for switching between jobs and publications */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <button
            onClick={() => setActiveContentType("jobs")}
            disabled={activeContentType === "jobs"}
            aria-pressed={activeContentType === "jobs"}
            style={{
              backgroundColor:
                activeContentType === "jobs" ? "#007bff" : "#f8f9fa",
              color: activeContentType === "jobs" ? "#ffffff" : "#212529",
              border: "1px solid",
              borderColor: activeContentType === "jobs" ? "#007bff" : "#ced4da",
              borderRadius: "20px",
              padding: "10px 20px",
              margin: "0 5px",
              cursor: "crosshair",
              fontSize: "0.75rem",
              fontWeight: "600",
              fontFamily: "var(--font-mono)",
              transition: "all 0.3s ease",
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
                activeContentType === "rjobs" ? "#007bff" : "#f8f9fa",
              color: activeContentType === "rjobs" ? "#ffffff" : "#212529",
              border: "1px solid",
              borderColor:
                activeContentType === "rjobs" ? "#007bff" : "#ced4da",
              borderRadius: "20px",
              padding: "10px 20px",
              margin: "0 5px",
              cursor: "crosshair",
              fontSize: "0.75rem",
              fontWeight: "600",
              fontFamily: "var(--font-mono)",
              transition: "all 0.3s ease",
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
                activeContentType === "publications" ? "#007bff" : "#f8f9fa",
              color:
                activeContentType === "publications" ? "#ffffff" : "#212529",
              border: "1px solid",
              borderColor:
                activeContentType === "publications" ? "#007bff" : "#ced4da",
              borderRadius: "50px",
              padding: "10px 20px",
              margin: "0 5px",
              cursor: "crosshair",
              fontSize: "0.75rem",
              fontWeight: "600",
              fontFamily: "var(--font-mono)",
              transition: "all 0.3s ease",
              outline: "none",
            }}
          >
            Publications
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
            <StyledHighlight activeTabId={activeTabId} />
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
