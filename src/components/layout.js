import React, { useState, useEffect, useRef } from "react"
import { navigate, Link } from "gatsby"
import PropTypes from "prop-types"
import styled, { ThemeProvider } from "styled-components"
import { Head, CommandPalette } from "@components"
import theme from "@styles/theme"
import GlobalStyle from "@styles/GlobalStyle"
import About from "@components/sections/about"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

const sections = [
  "publications",
  "education",
  "experience",
  "collaborators",
  "news",
  "cv",
  "contact",
]
// Visually distinct groups in the sidebar. Each inner array is rendered
// as a block with a hairline separator between groups. Order across groups
// is preserved relative to the flat `sections` array above.
const sectionGroups = [
  ["publications", "education", "experience"],
  ["collaborators"],
  ["news", "cv", "contact"],
]
const STANDALONE_PAGES = {
  publications: "/publications",
  collaborators: "/collaborators",
}
// Sidebar items that deep-link to the in-page experience section with a
// specific content-type tab pre-selected. Maps sidebar id -> element id
// to scroll to, and the activeContentType to broadcast to the experience
// component (via the experience-tab custom event).
const EXPERIENCE_TABS = {
  education: { scrollTo: "experience", tab: "education" },
  experience: { scrollTo: "experience", tab: "jobs" },
}

// Check if current page is a detail page (not home, not listing pages)
const isDetailPage = pathname => {
  if (!pathname) return false
  // Publication detail pages, post pages, etc.
  const detailPatterns = [
    /^\/publications\/[^/]+/, // /publications/something
    /^\/pensieve\/[^/]+/, // /pensieve/something (blog posts)
  ]
  return detailPatterns.some(pattern => pattern.test(pathname))
}

// Minimal header for detail pages on mobile
const StyledMinimalHeader = styled.header`
  display: none;

  @media (max-width: 767px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: ${({ theme }) =>
      theme.mode === "light" ? "#f5f5f7" : "#000000"};
    border-bottom: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#2d2d2d")};
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .back-link {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #005bb5; /* WCAG AA on #f5f5f7 (was #0071e3 — 4.31:1, now 6.05:1) */
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;

    &:hover {
      opacity: 0.8;
    }

    &:after {
      display: none;
    }
  }

  .site-name {
    font-size: 1.1rem;
    font-weight: 500;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    font-family: var(--font-serif);
    letter-spacing: -0.015em;
    font-variation-settings: "opsz" 96;
  }
`

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
  transition: top 0.2s ease;

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

  /* Mobile: normal document flow. Avoid overflow-x:hidden — it breaks sticky. */
  @media (max-width: 767px) {
    overflow: visible;
  }

  /* Desktop: fixed sidebar layout */
  @media (min-width: 768px) {
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
  }
`

const StyledSidebar = styled.aside`
  width: 100%;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(245, 245, 247, 0.92)"
      : "rgba(0, 0, 0, 0.92)"};
  backdrop-filter: saturate(180%) blur(14px);
  -webkit-backdrop-filter: saturate(180%) blur(14px);
  border-bottom: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#2d2d2d")};
  z-index: 50;
  flex-shrink: 0;
  transition: background-color 0.15s ease, border-color 0.15s ease;

  @media (max-width: 767px) {
    position: sticky;
    top: 0;
    padding: 8px 12px;
  }

  @media (min-width: 768px) {
    background: ${({ theme }) =>
      theme.mode === "light" ? "#f5f5f7" : "#000000"};
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  /* Hide full sidebar on detail pages on mobile */
  ${({ hideOnMobile }) =>
    hideOnMobile &&
    `
    @media (max-width: 767px) {
      display: none;
    }
  `}

  @media (min-width: 768px) {
    width: 300px;
    height: 100vh;
    position: fixed;
    padding: 32px 24px;
    justify-content: center;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    border-bottom: none;
    border-right: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#2d2d2d")};
  }

  @media (min-width: 1080px) {
    width: 350px;
    padding: 40px 32px;
  }

  @media (min-width: 768px) and (max-height: 800px) {
    justify-content: flex-start;
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
      align-items: stretch;
      width: 100%;
      gap: 0;
      max-width: 200px;
      margin-left: auto;
      margin-right: auto;

      li {
        width: 100%;
        text-align: left;
      }
    }

    @media (max-width: 767px) {
      margin: 8px 0;

      ul {
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        gap: 2px;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
        padding: 0 4px;
        /* Soft fade at edges so it reads as scrollable */
        mask-image: linear-gradient(
          to right,
          transparent,
          black 12px,
          black calc(100% - 12px),
          transparent
        );
        -webkit-mask-image: linear-gradient(
          to right,
          transparent,
          black 12px,
          black calc(100% - 12px),
          transparent
        );

        &::-webkit-scrollbar {
          display: none;
        }

        li {
          width: auto;
          flex-shrink: 0;
        }
      }
    }
  }
`

const StyledMainContent = styled.main`
  width: 100%;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  z-index: 10;
  background: ${({ theme }) =>
    theme.mode === "light" ? "#ffffff" : "#000000"};
  color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  flex: 1;
  position: relative;
  transition: background-color 0.15s ease, color 0.15s ease;

  /* Mobile: normal scrolling */
  @media (max-width: 767px) {
    overflow: visible;
    min-height: auto;
  }

  /* Desktop: scrollable container */
  @media (min-width: 768px) {
    margin-left: 300px;
    width: calc(100% - 300px);
    padding: 48px 40px;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  @media (min-width: 1080px) {
    margin-left: 350px;
    width: calc(100% - 350px);
    padding: 64px 60px;
  }

  /* Hide scrollbar but keep functionality - desktop only */
  @media (min-width: 768px) {
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  /* Light-mode base colors. Component styles win for muted hierarchy. */
  ${({ theme }) =>
    theme.mode === "light" &&
    `
    h1, h2, h3, h4, h5, h6 {
      color: #1d1d1f;
    }

    .numbered-heading::before {
      color: #0071e3;
    }
  `}
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
  flex-shrink: 0;

  @media (max-width: 767px) {
    display: none;
  }

  span {
    font-size: 0.85rem;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
      "Helvetica Neue", sans-serif;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};

    @media (max-width: 767px) {
      font-size: 0.75rem;
    }
  }
`

const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
  cursor: pointer;

  @media (max-width: 767px) {
    width: 44px;
    height: 24px;
  }
`

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background: #0071e3;
  }

  &:checked + span:before {
    transform: translateX(24px);

    @media (max-width: 767px) {
      transform: translateX(20px);
    }
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
    theme.mode === "light" ? "#d2d2d7" : "#39393d"};
  transition: background-color 0.2s ease;
  border-radius: 28px;

  &:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background: #ffffff;
    transition: transform 0.2s ease;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

    @media (max-width: 767px) {
      height: 18px;
      width: 18px;
    }
  }
`

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #0071e3;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 100;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? "scale(1)" : "scale(0.8)")};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};

  /* Only show on mobile */
  @media (min-width: 768px) {
    display: none;
  }

  &:hover {
    background: #0077ed;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`

const StyledTabButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: baseline;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  border: none;
  background: transparent;
  padding: 7px 0 7px 22px;
  cursor: pointer;
  outline: none;
  white-space: nowrap;
  transition: color 0.18s ease, letter-spacing 0.2s ease;
  width: 100%;

  color: ${({ isActive, theme }) =>
    isActive
      ? theme.mode === "light"
        ? "#1d1d1f"
        : "#f5f5f7"
      : theme.mode === "light"
      ? "#86868b"
      : "#6e6e73"};

  /* Thin animated accent rule that slides in on the active row. Slim
     enough to read as a typographic mark rather than a UI chrome bar. */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: ${({ isActive }) => (isActive ? "14px" : "6px")};
    height: 1px;
    background: ${({ isActive, theme }) =>
      isActive
        ? theme.mode === "light"
          ? "#1d1d1f"
          : "#f5f5f7"
        : theme.mode === "light"
        ? "rgba(0, 0, 0, 0.18)"
        : "rgba(255, 255, 255, 0.18)"};
    transition: width 0.22s cubic-bezier(0.22, 1, 0.36, 1),
      background-color 0.18s ease;
  }

  &:hover {
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    letter-spacing: 0.18em;
  }

  &:hover::before {
    width: 14px;
    background: ${({ theme }) =>
      theme.mode === "light" ? "#1d1d1f" : "#f5f5f7"};
  }

  &:focus-visible {
    outline: 2px solid #0071e3;
    outline-offset: 3px;
    border-radius: 2px;
  }

  @media (max-width: 767px) {
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    padding: 6px 10px;
    justify-content: center;
    width: auto;

    &::before {
      display: none;
    }

    &:hover {
      letter-spacing: 0.14em;
    }
  }
`

const StyledGroupGap = styled.li`
  list-style: none;
  width: 100%;
  height: 14px;
  pointer-events: none;

  @media (max-width: 767px) {
    width: 14px;
    height: 1px;
    flex-shrink: 0;
  }
`

const ToggleSwitch = ({ label, onChange, initialChecked }) => {
  const [checked, setChecked] = useState(initialChecked)

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
          color: "#6e6e73",
          fontSize: "0.7rem",
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
  const [activeSection, setActiveSection] = useState("")
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Get initial theme preference from localStorage if available
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      return savedTheme || "light" // Default to light if no preference saved
    }
    return "light"
  })

  // Track scroll position for Back to Top button (mobile only)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        setShowBackToTop(window.scrollY > 400)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections
        .map(section => ({
          id: section,
          element: document.getElementById(section),
        }))
        .filter(item => item.element)

      if (sectionElements.length === 0) return

      // Skip if we're in a programmatic scroll from nav click
      if (isScrollingRef.current) return

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
          // Preserve education / experience-jobs sidebar highlight while
          // scrolled over the shared #experience element.
          setActiveSection(prev => {
            const alias = EXPERIENCE_TABS[prev]
            if (alias && alias.scrollTo === id) return prev
            return id
          })
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

  // Highlight matching standalone-page tab when on its route
  useEffect(() => {
    if (!location) return
    if (location.pathname.startsWith("/publications")) {
      setActiveSection("publications")
    } else if (location.pathname.startsWith("/collaborators")) {
      setActiveSection("collaborators")
    }
  }, [location])

  // Handle hash-based navigation when landing on home page
  useEffect(() => {
    if (location && location.pathname === "/" && location.hash) {
      const sectionId = location.hash.replace("#", "")
      const tabConfig = EXPERIENCE_TABS[sectionId]
      const targetId = tabConfig ? tabConfig.scrollTo : sectionId
      // Wait for DOM to be ready
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(targetId)
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
          if (tabConfig) {
            window.dispatchEvent(
              new CustomEvent("experience-tab", { detail: tabConfig.tab })
            )
          }
        }
      }, 100) // Small delay to ensure DOM is ready

      return () => clearTimeout(timeoutId)
    }
  }, [location])

  const isScrollingRef = useRef(false)

  const handleSectionClick = (e, section) => {
    e.preventDefault()
    if (STANDALONE_PAGES[section]) {
      navigate(STANDALONE_PAGES[section])
    } else {
      const tabConfig = EXPERIENCE_TABS[section]
      const targetSection = tabConfig ? tabConfig.scrollTo : section
      const isHomePage = location && location.pathname === "/"
      if (!isHomePage) {
        // The hash itself encodes which tab to open. The landing effect
        // on the home page reads location.hash and broadcasts the tab.
        navigate(`/#${section}`)
        return
      }

      // Immediately set active section and suppress scroll observer
      setActiveSection(section)
      isScrollingRef.current = true

      if (tabConfig) {
        window.dispatchEvent(
          new CustomEvent("experience-tab", { detail: tabConfig.tab })
        )
      }
      // Encode the tab choice in the URL hash so it can be shared or
      // restored on reload. Use replaceState so the back button isn't
      // polluted by every tab toggle.
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", `#${section}`)
      }

      const element = document.getElementById(targetSection)
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
      }

      // Re-enable scroll observer after scroll finishes
      setTimeout(() => {
        isScrollingRef.current = false
      }, 600)
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
        <StyledContainer>
          {/* Minimal header for detail pages on mobile */}
          {isDetailPage(location?.pathname) && (
            <StyledMinimalHeader>
              <Link to="/" className="back-link">
                ← Home
              </Link>
              <span className="site-name">Jacob Dineen</span>
            </StyledMinimalHeader>
          )}

          <StyledSidebar
            role="navigation"
            aria-label="Main navigation"
            hideOnMobile={isDetailPage(location?.pathname)}
          >
            <About />
            <nav>
              <ul>
                {sectionGroups.map((group, gi) => (
                  <React.Fragment key={gi}>
                    {gi > 0 && (
                      <StyledGroupGap aria-hidden="true" role="presentation" />
                    )}
                    {group.map(section => (
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
                  </React.Fragment>
                ))}
              </ul>
            </nav>
            <ToggleSwitch
              label={themeMode === "dark" ? "Dark" : "Light"}
              onChange={toggleTheme}
              initialChecked={themeMode === "dark"}
            />
          </StyledSidebar>
          <StyledMainContent id="content">{children}</StyledMainContent>
          <BackToTopButton
            visible={showBackToTop}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            ↑
          </BackToTopButton>
          <CommandPalette />
        </StyledContainer>
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

export default Layout
