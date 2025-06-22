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

  @media (min-width: 480px) {
    flex-direction: row;
  }
`

const StyledSidebar = styled.aside`
  width: 100%;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) =>
    theme.mode === "light" ? "var(--light-slate)" : "var(--navy)"};
  z-index: 5;
  position: relative;

  @media (min-width: 480px) {
    width: 280px;
    height: 100vh;
    position: fixed;
    padding: 20px 15px;
    justify-content: center;
  }

  @media (min-width: 768px) {
    width: 300px;
    padding: 0 25px;
  }

  @media (min-width: 1080px) {
    width: 350px;
  }

  nav {
    width: 100%;
    margin: 15px 0;

    @media (min-width: 480px) {
      margin: 20px 0;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      li {
        margin: 6px 0;
        width: 100%;
        text-align: center;

        @media (min-width: 480px) {
          margin: 8px 0;
        }
      }
    }
  }
`

const StyledMainContent = styled.main`
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  min-height: 100vh;
  background-color: ${({ theme }) =>
    theme.mode === "light" ? "var(--white)" : "var(--navy)"};
  color: ${({ theme }) =>
    theme.mode === "light" ? "var(--dark-navy)" : "var(--slate)"};

  @media (min-width: 480px) {
    margin-left: 280px;
    width: calc(100% - 280px);
    padding: 30px 20px;
    height: 100vh;
    overflow-y: auto;
    border-left: 1px solid
      ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(0, 0, 0, 0.1)"
          : "rgba(255, 255, 255, 0.1)"};
  }

  @media (min-width: 768px) {
    margin-left: 300px;
    width: calc(100% - 300px);
    padding: 40px 30px;
  }

  @media (min-width: 1080px) {
    margin-left: 350px;
    width: calc(100% - 350px);
    padding: 60px 40px;
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
  margin-top: 15px;

  @media (min-width: 480px) {
    margin-top: 20px;
  }
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
  border-radius: 20px;
  background-color: transparent;
  text-align: center;
  box-sizing: border-box;
  padding: 0 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;

  &:hover,
  &:focus {
    background-color: ${({ theme }) =>
      theme.mode === "light" ? "var(--light-slate)" : "var(--light-navy)"};
    color: ${({ theme }) =>
      theme.mode === "light" ? "var(--green-dark)" : "var(--green)"};
    box-shadow: 0 4px 8px
      ${({ theme }) =>
        theme.mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.2)"};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) =>
        theme.mode === "light" ? "var(--green-dark)" : "var(--green)"};
    outline-offset: 3px;
  }

  ${({ isActive, theme }) =>
    isActive &&
    `
    background-color: ${
      theme.mode === "light" ? "var(--white)" : "var(--navy)"
    };
    color: ${theme.mode === "light" ? "var(--green-dark)" : "var(--green)"};
    box-shadow: 0 6px 12px ${
      theme.mode === "light" ? "rgba(0, 0, 0, 0.15)" : "rgba(0, 0, 0, 0.3)"
    };
    transform: scale(1.05);
    z-index: 1;
    border-bottom: 3px solid ${
      theme.mode === "light" ? "var(--green-dark)" : "var(--green)"
    };
  `}
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
  }

  const toggleTheme = checked => {
    setThemeMode(checked ? "dark" : "light")
  }

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
