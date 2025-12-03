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
  background: ${({ theme }) =>
    theme.mode === "light" ? "#667eea" : "#00c9ff"};
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:focus {
    top: 6px;
    outline: 2px solid
      ${({ theme }) => (theme.mode === "light" ? "#764ba2" : "#92fe9d")};
    outline-offset: 2px;
  }

  &:hover:focus {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
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
    theme.mode === "light"
      ? "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)"
      : "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)"};
  border-right: 1px solid
    ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(226, 232, 240, 0.8)"
        : "rgba(100, 255, 218, 0.1)"};
  z-index: 5;
  position: relative;
  flex-shrink: 0;
  box-shadow: ${({ theme }) =>
    theme.mode === "light"
      ? "4px 0 16px rgba(0, 0, 0, 0.04)"
      : "4px 0 16px rgba(0, 0, 0, 0.2)"};

  @media (min-width: 768px) {
    width: 300px;
    height: 100vh;
    position: fixed;
    padding: 32px 24px;
    justify-content: center;
    box-shadow: ${({ theme }) =>
      theme.mode === "light"
        ? "8px 0 24px rgba(0, 0, 0, 0.06)"
        : "8px 0 24px rgba(0, 0, 0, 0.3)"};
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
      gap: 12px;

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
    theme.mode === "light"
      ? "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)"
      : "linear-gradient(180deg, #0f172a 0%, #020617 100%)"};
  color: ${({ theme }) => (theme.mode === "light" ? "#1e293b" : "#e2e8f0")};
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "radial-gradient(600px circle at 50% 300px, rgba(102, 126, 234, 0.05), transparent 50%)"
        : "radial-gradient(600px circle at 50% 300px, rgba(0, 201, 255, 0.05), transparent 50%)"};
    pointer-events: none;
    z-index: -1;
  }

  @media (min-width: 768px) {
    margin-left: 300px;
    width: calc(100% - 300px);
    padding: 48px 40px;
    height: 100vh;
  }

  @media (min-width: 1080px) {
    margin-left: 350px;
    width: calc(100% - 350px);
    padding: 64px 48px;
  }

  /* Custom scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(0, 0, 0, 0.2)"
        : "rgba(255, 255, 255, 0.2)"}
    transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(0, 0, 0, 0.2)"
        : "rgba(255, 255, 255, 0.2)"};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(0, 0, 0, 0.3)"
        : "rgba(255, 255, 255, 0.3)"};
  }

  /* Add text color overrides for light mode */
  ${({ theme }) =>
    theme.mode === "light" &&
    `
    h1, h2, h3, h4, h5, h6 {
      color: var(--dark-navy);
    }
    
    p, li, span, div {
      color: var(--dark-slate);
    }
    
    /* Section numbers and special elements */
    .numbered-heading::before {
      color: var(--green-dark);
    }
    
    /* Links and highlights */
    a {
      color: var(--green-dark);
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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      sans-serif;
    color: ${({ theme }) => (theme.mode === "light" ? "#64748b" : "#94a3b8")};
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
    background: linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%);
  }

  &:checked + span:before {
    transform: translateX(24px);
  }

  &:focus + span {
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(102, 126, 234, 0.3)"
          : "rgba(0, 201, 255, 0.3)"};
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
    theme.mode === "light"
      ? "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)"
      : "linear-gradient(135deg, #334155 0%, #475569 100%)"};
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 28px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  &:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)"
        : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"};
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &:hover {
    transform: scale(1.05);
  }
`

const StyledTabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    sans-serif;
  width: 100%;
  min-height: 48px;
  height: auto;
  border: none;
  border-radius: 16px;
  text-align: center;
  box-sizing: border-box;
  padding: 14px 20px;
  cursor: pointer;
  outline: none;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.01em;

  background: ${({ isActive, theme }) =>
    isActive
      ? theme.mode === "light"
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)"
      : theme.mode === "light"
      ? "rgba(255, 255, 255, 0.7)"
      : "rgba(15, 23, 42, 0.7)"};

  backdrop-filter: blur(10px);
  border: 1px solid
    ${({ isActive, theme }) =>
      isActive
        ? "transparent"
        : theme.mode === "light"
        ? "rgba(226, 232, 240, 0.8)"
        : "rgba(100, 255, 218, 0.1)"};

  color: ${({ isActive, theme }) =>
    isActive ? "white" : theme.mode === "light" ? "#475569" : "#94a3b8"};

  box-shadow: ${({ isActive, theme }) =>
    isActive
      ? theme.mode === "light"
        ? "0 8px 24px rgba(102, 126, 234, 0.3)"
        : "0 8px 24px rgba(0, 201, 255, 0.3)"
      : theme.mode === "light"
      ? "0 4px 16px rgba(0, 0, 0, 0.08)"
      : "0 4px 16px rgba(0, 0, 0, 0.2)"};

  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    background: ${({ isActive, theme }) =>
      isActive
        ? theme.mode === "light"
          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          : "linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)"
        : theme.mode === "light"
        ? "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"
        : "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.8) 100%)"};

    box-shadow: ${({ isActive, theme }) =>
      isActive
        ? theme.mode === "light"
          ? "0 12px 32px rgba(102, 126, 234, 0.4)"
          : "0 12px 32px rgba(0, 201, 255, 0.4)"
        : theme.mode === "light"
        ? "0 8px 24px rgba(0, 0, 0, 0.12)"
        : "0 8px 24px rgba(0, 0, 0, 0.3)"};

    &::before {
      left: 100%;
    }
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => (theme.mode === "light" ? "#667eea" : "#00c9ff")};
    outline-offset: 3px;
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
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
