import React, { useState, useEffect, useContext } from "react"
import PropTypes from "prop-types"
import styled, { ThemeProvider, ThemeContext } from "styled-components"
import { Head, Loader } from "@components"
import theme from "@styles/theme"
import GlobalStyle from "@styles/GlobalStyle"
import About from "@components/sections/about"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

const sections = ["experience", "contact", "resume"]

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const StyledSidebar = styled.aside`
  width: 100%;
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) =>
    theme.mode === "light" ? "var(--light-slate)" : "var(--navy)"};
  z-index: 5;
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  box-shadow: ${({ theme }) =>
    theme.mode === "light"
      ? "0 5px 15px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)"
      : "0 10px 30px -15px rgba(2, 12, 27, 0.7)"};

  @media (max-width: 767px) {
    max-height: calc(100vh - 50px);
  }

  @media (min-width: 768px) {
    width: 300px;
    height: 100vh;
    position: fixed;
    padding: 0 25px;
    justify-content: center;
  }

  @media (min-width: 1080px) {
    width: 350px;
  }

  nav {
    width: 100%;
    margin: 20px 0;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      li {
        margin: 8px 0;
        width: 100%;
        text-align: center;
      }
    }
  }
`

const StyledTabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) =>
    theme.mode === "light" ? "var(--dark-slate)" : "var(--green)"};
  font-size: var(--fz-xxs);
  width: 100%;
  height: var(--tab-height);
  border: none;
  border-radius: 8px;
  background-color: transparent;
  text-align: center;
  box-sizing: border-box;
  padding: 0 20px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  outline: none;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "linear-gradient(120deg, rgba(100, 255, 218, 0), rgba(100, 255, 218, 0.1), rgba(100, 255, 218, 0))"
        : "linear-gradient(120deg, rgba(100, 255, 218, 0), rgba(100, 255, 218, 0.1), rgba(100, 255, 218, 0))"};
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover,
  &:focus {
    color: ${({ theme }) =>
      theme.mode === "light" ? "var(--green-dark)" : "var(--green)"};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px
      ${({ theme }) =>
        theme.mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.2)"};

    &::before {
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) =>
        theme.mode === "light" ? "var(--green-dark)" : "var(--green)"};
    outline-offset: 3px;
  }

  &:active {
    transform: translateY(1px);
  }

  ${({ isActive, theme }) =>
    isActive &&
    `
    background-color: ${
      theme.mode === "light" ? "var(--white)" : "var(--navy)"
    };
    color: ${theme.mode === "light" ? "var(--green-dark)" : "var(--green)"};
    box-shadow: 0 6px 14px ${
      theme.mode === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(0, 0, 0, 0.2)"
    };
    transform: scale(1.03);
    z-index: 1;
    font-weight: 600;
    border-left: 3px solid ${
      theme.mode === "light" ? "var(--green-dark)" : "var(--green)"
    };
    
    &::before {
      opacity: 1;
      background: ${
        theme.mode === "light"
          ? "linear-gradient(120deg, rgba(100, 255, 218, 0.05), rgba(100, 255, 218, 0.15), rgba(100, 255, 218, 0.05))"
          : "linear-gradient(120deg, rgba(100, 255, 218, 0.05), rgba(100, 255, 218, 0.15), rgba(100, 255, 218, 0.05))"
      };
    }
  `}
`

const StyledMainContent = styled.main`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  min-height: 100vh;
  background-color: ${({ theme }) =>
    theme.mode === "light" ? "var(--white)" : "var(--navy)"};
  color: ${({ theme }) =>
    theme.mode === "light" ? "var(--dark-navy)" : "var(--slate)"};

  @media (min-width: 768px) {
    margin-left: 300px;
    padding: 80px 40px;
    width: calc(100% - 300px);
  }

  @media (min-width: 1080px) {
    margin-left: 350px;
    width: calc(100% - 350px);
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

const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;

  @media (min-width: 768px) {
    display: none;
  }
`

const MenuToggle = styled.button`
  background: transparent;
  border: none;
  color: var(--green);
  font-size: 24px;
  cursor: pointer;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: 2px solid var(--green);
    outline-offset: 3px;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: 0 10px;
`

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) =>
      theme.mode === "light" ? "var(--green-dark)" : "var(--green)"};
  }

  &:checked + span:before {
    transform: translateX(16px);
  }

  &:focus + span {
    box-shadow: 0 0 0 2px
      ${({ theme }) =>
        theme.mode === "light" ? "var(--dark-navy)" : "var(--light-slate)"};
  }
`

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) =>
    theme.mode === "light" ? "var(--slate)" : "var(--light-navy)"};
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
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
  const [menuOpen, setMenuOpen] = useState(false)

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
        .filter(section => section !== "resume")
        .map(section => ({
          id: section,
          element: document.getElementById(section),
        }))
        .filter(item => item.element)

      if (sectionElements.length === 0) return

      const scrollPosition = window.scrollY + window.innerHeight / 3

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

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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

  const handleSectionClick = (e, section) => {
    e.preventDefault()
    if (section === "resume") {
      window.open("/jacobdineen_resume3.pdf", "_blank", "noopener,noreferrer")
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })
      setActiveSection(section)
    }
    // Close mobile menu after selection
    setMenuOpen(false)
  }

  const toggleTheme = checked => {
    setThemeMode(checked ? "dark" : "light")
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // Check if it's a mobile view
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  // Determine if sidebar should be shown
  const showSidebar = !isMobile || (isMobile && menuOpen)

  return (
    <>
      <Head />
      <ThemeProvider theme={{ ...theme, mode: themeMode }}>
        <GlobalStyle />
        <Analytics />
        <SpeedInsights />
        {isLoading ? (
          <Loader finishLoading={() => setIsLoading(false)} />
        ) : (
          <StyledContainer>
            {isMobile && (
              <MobileHeader>
                <MenuToggle
                  onClick={toggleMenu}
                  aria-expanded={menuOpen}
                  aria-label="Toggle navigation menu"
                >
                  {menuOpen ? "✕" : "☰"}
                </MenuToggle>
                <ToggleSwitch
                  label="Dark Mode"
                  onChange={toggleTheme}
                  initialChecked={themeMode === "dark"}
                />
              </MobileHeader>
            )}

            {showSidebar && (
              <StyledSidebar
                role="navigation"
                aria-label="Main navigation"
                style={
                  isMobile
                    ? {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: "100vh",
                        zIndex: 99,
                        transform: menuOpen
                          ? "translateX(0)"
                          : "translateX(-100%)",
                        transition: "transform 0.3s ease-in-out",
                      }
                    : {}
                }
              >
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
                {!isMobile && (
                  <ToggleSwitch
                    label="Dark Mode"
                    onChange={toggleTheme}
                    initialChecked={themeMode === "dark"}
                  />
                )}
              </StyledSidebar>
            )}
            <StyledMainContent id="content">{children}</StyledMainContent>

            {/* Overlay for mobile menu */}
            {isMobile && menuOpen && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.5)",
                  zIndex: 98,
                }}
                onClick={toggleMenu}
                aria-hidden="true"
              />
            )}
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
