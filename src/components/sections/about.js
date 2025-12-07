import React, { useEffect, useRef } from "react"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { srConfig } from "@config"
import sr from "@utils/sr"
import { usePrefersReducedMotion } from "@hooks"
import {
  IconGitHub,
  IconLinkedin,
  IconGmail,
  IconGScholar,
  IconSemanticScholar,
  IconTwitter,
} from "@components/icons"

const SidebarIcons = styled.aside`
  display: flex;
  gap: 6px;
  justify-content: center;
  flex-wrap: wrap;

  /* Mobile: smaller icons */
  @media (max-width: 767px) {
    justify-content: flex-start;
  }

  @media (min-width: 768px) {
    gap: 10px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#3d3d3d")};
    border-radius: 8px;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
    transition: all 0.2s ease;

    &:hover {
      background: #0071e3;
      color: white;
      border-color: #0071e3;
    }

    @media (min-width: 768px) {
      width: 44px;
      height: 44px;
      border-radius: 10px;
    }
  }

  svg {
    width: 16px;
    height: 16px;
    transition: all 0.2s ease;

    @media (min-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }
`

const StyledAboutSection = styled.section`
  width: 100%;
  margin: 0 auto;
  background: transparent;
  border-radius: 20px;

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 0;
    width: 100%;
  }

  /* Mobile: horizontal layout */
  @media (max-width: 767px) {
    .inner {
      flex-direction: row;
      gap: 16px;
      padding: 0;
    }
  }

  @media (min-width: 768px) {
    .inner {
      gap: 20px;
      padding: 20px;
    }
  }
`

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;

  /* Mobile: left-aligned text */
  @media (max-width: 767px) {
    align-items: flex-start;
    text-align: left;
  }

  h1 {
    font-size: 1.1rem;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
      "Helvetica Neue", sans-serif;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    margin: 0 0 4px 0;
    line-height: 1.2;
    letter-spacing: -0.02em;

    @media (min-width: 768px) {
      font-size: clamp(1.4rem, 3vw, 1.8rem);
      margin: 0 0 8px 0;
    }
  }

  h2 {
    font-size: 0.75rem;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
      "Helvetica Neue", sans-serif;
    font-weight: 500;
    color: #0071e3;
    margin: 0 0 8px 0;
    line-height: 1.3;

    @media (min-width: 768px) {
      font-size: clamp(0.85rem, 2.5vw, 1rem);
      margin: 0 0 20px 0;
    }
  }

  p {
    display: none;
  }
`

const StyledPic = styled.div`
  position: relative;
  width: 70px;
  min-width: 70px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 120px;
    min-width: 120px;
  }

  @media (min-width: 1080px) {
    width: 140px;
    min-width: 140px;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    border-radius: 50%;
    transition: all 0.3s ease;

    .img {
      position: relative;
      border-radius: 50%;
      transition: var(--transition);
      box-shadow: ${({ theme }) =>
        theme.mode === "light"
          ? "0 2px 10px rgba(0, 0, 0, 0.1)"
          : "0 2px 10px rgba(0, 0, 0, 0.3)"};
    }
  }
`

const About = () => {
  const revealContainer = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    sr.reveal(revealContainer.current, srConfig())
  }, [])

  return (
    <>
      <StyledAboutSection id="about" ref={revealContainer}>
        <div className="inner">
          <StyledPic>
            <div className="wrapper">
              <StaticImage
                className="img"
                src="../../images/me.jpg"
                width={500}
                quality={95}
                formats={["AUTO", "WEBP", "AVIF"]}
                alt="Headshot"
              />
            </div>
          </StyledPic>
          <StyledText>
            <h1>Jacob Dineen</h1>
            <h2> ASU CS PhD Student / MLE</h2>
            <SidebarIcons>
              <a href="https://github.com/jacobdineen" aria-label="GitHub">
                <IconGitHub />
              </a>
              <a
                href="https://www.linkedin.com/in/jacobdineen/"
                aria-label="Linkedin"
              >
                <IconLinkedin />
              </a>
              <a href="https://x.com/jakedineenasu" aria-label="Twitter">
                <IconTwitter />
              </a>
              <a
                href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiDv7jF5-yEAxXDIEQIHQzsCHEQFnoECBIQAQ&url=https%3A%2F%2Fscholar.google.com%2Fcitations%3Fuser%3DWKurvcoAAAAJ%26hl%3Den&usg=AOvVaw329Uar6xNQ9B1keI_PT4Oc&opi=89978449"
                aria-label="Google Scholar"
              >
                <IconGScholar />
              </a>
              <a
                href="https://www.semanticscholar.org/author/Jacob-Dineen/1576998836"
                aria-label="Semantic Scholar"
              >
                <IconSemanticScholar />
              </a>

              <a href="mailto:jdineen@asu.edu" aria-label="Send email">
                <IconGmail />
              </a>
            </SidebarIcons>
          </StyledText>
        </div>
      </StyledAboutSection>
    </>
  )
}

export default About
