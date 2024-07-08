import React, { useState } from "react"
import PropTypes from "prop-types"
import styled, { ThemeProvider } from "styled-components"
import { Head, Loader, Footer } from "@components"
import { GlobalStyle, theme } from "@styles"
import About from "@components/sections/about"
// import { Link } from 'gatsby';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
const sections = ["experience", "contact", "resume"]

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column; // Stack children vertically on mobile by default

  @media (min-width: 600px) {
    flex-direction: row; // Switch to horizontal layout for larger screens
  }
`

const StyledSidebar = styled.aside`
  width: 30%; // Start with a percentage width
  height: 100vh;
  position: fixed;
  padding: 0 25px;
  display: flex;
  margin-left: 90px;
  flex-direction: column;
  justify-content: center;
  z-index: 5;

  // Use media queries to adjust layout at different breakpoints
  @media (max-width: 1080px) {
    width: 40%; // Increase the sidebar width on smaller screens
  }

  @media (max-width: 768px) {
    width: 50%; // Further increase the sidebar width on even smaller screens
  }

  @media (max-width: 600px) {
    position: relative; // Switch to relative positioning on very small screens
    width: 100%; // Sidebar takes full width
    height: auto; // Height adjusts to content
    padding-right: 210px;
  }

  nav {
    width: 100%; // Take the full width of the sidebar
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center; // Center align items for the nav

      li {
        margin: 8px 0; // Adjust space between links

        a {
          color: #89cfef; // Text color for the links
          text-decoration: none; // No underline
          font-size: 1em; // Adjust the font size as necessary
          transition: color 0.3s ease; // Transition for the color change

          display: flex; // Use flexbox for horizontal layout
          justify-content: center; // Center text horizontally
          position: relative; // Needed for the absolute positioning of the pseudo-element

          // Horizontal line for each item
          &::after {
            content: "";
            position: absolute;
            bottom: -5px; // Adjust this value to move the line up or down
            left: 50%; // Start at the center
            transform: translateX(-50%); // Center the line horizontally
            width: 30px; // Default width of the line
            height: 2px; // Height of the line
            background: transparent; // Transparent line by default
            transition: all 0.3s ease; // Smooth transition for the line width
          }

          // When active, show the line
          &.active::after {
            background: white; // Line color for active link
            width: 60px; // Longer line for the active item
          }

          &:hover {
            color: #64ffda; // Color change on hover
            &::after {
              background: #64ffda; // Line color on hover
            }
          }
        }
      }
    }
  }
`

const StyledMainContent = styled.main`
  width: 80%;
  margin-left: 30%; /* Adjust based on sidebar width */
  position: relative;
  padding-bottom: 0px;
  display: flex;
  z-index: 10; /* Lower than sidebar if overlay issues occur */
  padding-top: 80px;

  @media (max-width: 1080px) {
    width: 60%;
    margin-left: 40%; /* Adjust to match sidebar */
  }

  @media (max-width: 768px) {
    width: 40%;
    padding-top: 0px;

    margin-left: 50%; /* Adjust to match sidebar */
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
  }
`

const Layout = ({ children, location }) => {
  const [isLoading, setIsLoading] = useState(location.pathname === "/")
  const [activeSection, setActiveSection] = useState("")

  const handleSectionClick = (e, section) => {
    e.preventDefault()
    // Check if the clicked section is 'resume'
    if (section === "resume") {
      // Redirect to the resume.pdf file, adjust the path as necessary
      window.location.href = "/Academic_Resume2.pdf"
    } else {
      // Scroll to the selected section
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
      setActiveSection(section) // Optionally, mark the section as active
    }
  }

  return (
    <>
      <Head />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Analytics />
        <SpeedInsights />
        {isLoading ? (
          <Loader finishLoading={() => setIsLoading(false)} />
        ) : (
          <StyledContainer>
            <StyledSidebar>
              <About />
              <nav>
                <ul>
                  {sections.map(section => (
                    <li key={section}>
                      <a
                        href={`#${section}`}
                        className={activeSection === section ? "active" : ""}
                        onClick={e => handleSectionClick(e, section)}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </StyledSidebar>
            <StyledMainContent id="content">{children}</StyledMainContent>
          </StyledContainer>
        )}

        <Footer />
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

export default Layout
