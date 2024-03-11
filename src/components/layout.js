import React, { useState } from "react"
import PropTypes from "prop-types"
import styled, { ThemeProvider } from "styled-components"
import { Head, Loader, Footer } from "@components"
import { GlobalStyle, theme } from "@styles"
import About from "@components/sections/about"
// import { Link } from 'gatsby';
import { Analytics } from "@vercel/analytics/react"

const sections = ["experience", "contact"]

const StyledContainer = styled.div`
  display: flex;
`

const StyledSidebar = styled.aside`
  width: 65%; // Start with a percentage width
  height: 100vh;
  position: fixed;
  padding: 0 25px;
  display: flex;
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
    padding: 20px; // Adjust padding as needed
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
  margin-left: 38%; /* Adjust based on sidebar width */
  min-height: 100vh;
  overflow-y: auto;
  position: relative;
  padding-top: 70px;
  padding-bottom: 70px;
  display: flex;
  z-index: 10; /* Lower than sidebar if overlay issues occur */

  @media (max-width: 1080px) {
    width: 60%;
    margin-left: 40%; /* Adjust to match sidebar */
  }

  @media (max-width: 768px) {
    width: 50%;
    margin-left: 50%; /* Adjust to match sidebar */
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
  }
`

const Layout = ({ children, location }) => {
  const [isLoading, setIsLoading] = useState(location.pathname === "/")
  const [activeSection] = useState("")

  return (
    <>
      <Head />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Analytics />
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
                        onClick={e => {
                          e.preventDefault()
                          document
                            .getElementById(section)
                            ?.scrollIntoView({ behavior: "smooth" })
                        }}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </StyledSidebar>
            <StyledMainContent id="content">
              {children}
              <Footer />
            </StyledMainContent>
          </StyledContainer>
        )}
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

export default Layout
