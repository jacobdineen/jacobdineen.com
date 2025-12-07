import React, { useState, useEffect, useContext } from "react"
import { navigate } from "gatsby"
import PropTypes from "prop-types"
import styled, { ThemeProvider, ThemeContext } from "styled-components"
import { Head, Loader } from "@components"
import theme from "@styles/theme"
import GlobalStyle from "@styles/GlobalStyle"
import About from "@components/sections/about"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

const sections = ["publications", "experience", "news", "contact", "cv"]

const StyledSkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 6px;
  z-index: 999999;
  color: white;
  background: #0071e3;
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
    "Helvetica Neue", sans-serif;
  transition: all 0.3s ease;

  &:focus {
    top: 6px;
    outline: 2px solid #0071e3;
    outline-offset: 2px;
  }

  &:hover:focus {
    background: #0077ed;
  }
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
  }
`

const StyledSidebar = styled.aside`
  width: 100%;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) =>
    theme.mode === "light" ? "#f5f5f7" : "#000000"};
  border-right: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#2d2d2d")};
  z-index: 5;
  position: relative;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 300px;
    height: 100vh;
    position: fixed;
    padding: 32px 24px;
    justify-content: center;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  @media (min-width: 1080px) {
    width: 350px;
    padding: 40px 32px;
  }

  /* On shorter viewports, pin content to top so the bottom items (e.g., Resume) don't get cut off */
  @media (min-width: 768px) and (max-height: 800px) {
    justify-content: flex-start;
  }

  nav {
    width: 100%;
    margin: 24px 0;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      gap: 8px;

      li {
        width: 100%;
        text-align: center;
      }
    }
  }
`

const StyledMainContent = styled.main`
  width: 100%;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  background: ${({ theme }) =>
    theme.mode === "light" ? "#ffffff" : "#000000"};
  color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  position: relative;

  @media (min-width: 768px) {
    margin-left: 300px;
    width: calc(100% - 300px);
    padding: 48px 40px;
    height: 100vh;
  }

  @media (min-width: 1080px) {
    margin-left: 350px;
    width: calc(100% - 350px);
    padding: 64px 60px;
  }

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Text color overrides for light mode */
  ${({ theme }) =>
    theme.mode === "light" &&
    `
    h1, h2, h3, h4, h5, h6 {
      color: #1d1d1f;
    }
    
    p, li, span, div {
      color: #1d1d1f;
    }
    
    .numbered-heading::before {
      color: #0071e3;
    }
    
    a {
      color: #0071e3;
    }
  `}
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  flex-shrink: 0;

  span {
    font-size: 0.85rem;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
      "Helvetica Neue", sans-serif;
    color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#86868b")};
  }
`

const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
  cursor: pointer;
`

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background: #34c759;
  }

  &:checked + span:before {
    transform: translateX(24px);
  }

  &:focus + span {
    box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.3);
  }
`

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) =>
    theme.mode === "light" ? "#e5e5ea" : "#39393d"};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 28px;

  &:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background: #ffffff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`

const StyledTabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
    "Helvetica Neue", sans-serif;
  width: 100%;
  min-height: 44px;
  height: auto;
  border: none;
  border-radius: 10px;
  text-align: center;
  box-sizing: border-box;
  padding: 12px 20px;
  cursor: pointer;
  outline: none;
  white-space: nowrap;
  letter-spacing: -0.01em;

  background: ${({ isActive, theme }) =>
    isActive
      ? "#0071e3"
      : theme.mode === "light"
      ? "transparent"
      : "transparent"};

  color: ${({ isActive, theme }) =>
    isActive ? "#ffffff" : theme.mode === "light" ? "#1d1d1f" : "#f5f5f7"};

  transition: all 0.2s ease;

  &:hover {
    background: ${({ isActive, theme }) =>
      isActive
        ? "#0077ed"
        : theme.mode === "light"
        ? "rgba(0, 0, 0, 0.04)"
        : "rgba(255, 255, 255, 0.08)"};
  }

  &:focus-visible {
    outline: 2px solid #0071e3;
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.98);
  }
`

const ToggleSwitch = ({ label, onChange, initialChecked }) => {
  const [checked, setChecked] = useState(initialChecked)
  const themeContext = useContext(ThemeContext)

  useEffect(() => {
    setChecked(initialChecked)
  }, [initialChecked])

  const handleChange = () => {
    const newValue = !checked
    setChecked(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <ToggleWrapper>
      <span
        style={{
          color:
            themeContext.mode === "light"
              ? "var(--dark-slate)"
              : "var(--green)",
          fontSize: "var(--fz-xxs)",
        }}
      >
        {label}
      </span>
      <ToggleLabel>
        <ToggleInput
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          aria-label={`Toggle ${label}`}
        />
        <Slider />
      </ToggleLabel>
    </ToggleWrapper>
  )
}

ToggleSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  initialChecked: PropTypes.bool,
}

ToggleSwitch.defaultProps = {
  initialChecked: true,
}

const Layout = ({ children, location }) => {
  const [isLoading, setIsLoading] = useState(location.pathname === "/")
  const [activeSection, setActiveSection] = useState("")

  // Get initial theme preference from localStorage if available
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      return savedTheme || "dark" // Default to dark if no preference saved
    }
    return "dark"
  })

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections
        .filter(section => section !== "cv")
        .map(section => ({
          id: section,
          element: document.getElementById(section),
        }))
        .filter(item => item.element)

      if (sectionElements.length === 0) return

      // Get scroll position from the main content area on desktop, window on mobile
      const mainContent = document.getElementById("content")
      const isDesktop = window.innerWidth >= 768
      const scrollTop =
        isDesktop && mainContent ? mainContent.scrollTop : window.scrollY
      const scrollPosition = scrollTop + window.innerHeight / 3

      for (const { id, element } of sectionElements) {
        const { offsetTop, offsetHeight } = element
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(id)
          return
        }
      }
    }

    // Listen to both window and main content scroll events
    const mainContent = document.getElementById("content")
    window.addEventListener("scroll", handleScroll)
    if (mainContent) {
      mainContent.addEventListener("scroll", handleScroll)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (mainContent) {
        mainContent.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  // Save theme preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", themeMode)
      // Apply a class to the body for additional styling hooks
      if (themeMode === "dark") {
        document.body.classList.add("dark-mode")
        document.body.classList.remove("light-mode")
      } else {
        document.body.classList.add("light-mode")
        document.body.classList.remove("dark-mode")
      }
    }
  }, [themeMode])

  // Highlight Publications tab on publications route
  useEffect(() => {
    if (location && location.pathname.startsWith("/publications")) {
      setActiveSection("publications")
    }
  }, [location])

  // Handle hash-based navigation when landing on home page
  useEffect(() => {
    if (location && location.pathname === "/" && location.hash) {
      const sectionId = location.hash.replace("#", "")
      // Wait for DOM to be ready
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          const mainContent = document.getElementById("content")
          const isDesktop = window.innerWidth >= 768

          if (isDesktop && mainContent) {
            const offsetTop = element.offsetTop - mainContent.offsetTop
            mainContent.scrollTo({
              top: offsetTop - 20,
              behavior: "smooth",
            })
          } else {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          setActiveSection(sectionId)
        }
      }, 100) // Small delay to ensure DOM is ready

      return () => clearTimeout(timeoutId)
    }
  }, [location])

  const handleSectionClick = (e, section) => {
    e.preventDefault()
    if (section === "cv") {
      window.open("/cv/JacobDineen_CV.pdf", "_blank", "noopener,noreferrer")
    } else if (section === "publications") {
      navigate("/publications")
    } else {
      // If we're not on the home page, navigate there first
      const isHomePage = location && location.pathname === "/"
      if (!isHomePage) {
        navigate(`/#${section}`)
        return
      }

      const element = document.getElementById(section)
      if (element) {
        // On desktop, scroll within the main content area; on mobile, scroll the window
        const mainContent = document.getElementById("content")
        const isDesktop = window.innerWidth >= 768

        if (isDesktop && mainContent) {
          // For desktop, scroll within the main content container
          const offsetTop = element.offsetTop - mainContent.offsetTop
          mainContent.scrollTo({
            top: offsetTop - 20, // Add some padding
            behavior: "smooth",
          })
        } else {
          // For mobile, scroll the window normally
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
        setActiveSection(section)
      }
    }
  }

  const toggleTheme = checked => {
    setThemeMode(checked ? "dark" : "light")
  }

  return (
    <>
      <Head />
      <StyledSkipLink href="#content">Skip to main content</StyledSkipLink>
      <ThemeProvider theme={{ ...theme, mode: themeMode }}>
        <GlobalStyle />
        <Analytics />
        <SpeedInsights />
        {isLoading ? (
          <Loader finishLoading={() => setIsLoading(false)} />
        ) : (
          <StyledContainer>
            <StyledSidebar role="navigation" aria-label="Main navigation">
              <About />
              <nav>
                <ul>
                  {sections.map(section => (
                    <li key={section}>
                      <StyledTabButton
                        isActive={activeSection === section}
                        onClick={e => handleSectionClick(e, section)}
                        aria-current={
                          activeSection === section ? "page" : undefined
                        }
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </StyledTabButton>
                    </li>
                  ))}
                </ul>
              </nav>
              <ToggleSwitch
                label="Dark Mode"
                onChange={toggleTheme}
                initialChecked={themeMode === "dark"}
              />
            </StyledSidebar>
            <StyledMainContent id="content">{children}</StyledMainContent>
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
