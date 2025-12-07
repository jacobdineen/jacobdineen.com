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
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;

  @media (min-width: 480px) {
    gap: 10px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: transparent;
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#3d3d3d")};
    border-radius: 10px;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
    transition: all 0.2s ease;

    &:hover {
      background: #0071e3;
      color: white;
      border-color: #0071e3;
      transform: translateY(-2px);
    }

    @media (min-width: 480px) {
      width: 44px;
      height: 44px;
    }
  }

  svg {
    width: 18px;
    height: 18px;
    transition: all 0.2s ease;

    @media (min-width: 480px) {
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
    gap: 16px;
    padding: 24px 20px;
    width: 100%;
  }

  @media (min-width: 480px) {
    .inner {
      gap: 20px;
      padding: 32px 24px;
    }
  }

  @media (min-width: 768px) {
    .inner {
      padding: 40px 32px;
    }
  }
`

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;

  h1 {
    font-size: clamp(1.3rem, 4vw, 1.6rem);
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
      "Helvetica Neue", sans-serif;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    margin: 0 0 6px 0;
    line-height: 1.2;
    letter-spacing: -0.02em;

    @media (min-width: 480px) {
      font-size: clamp(1.4rem, 3vw, 1.8rem);
      margin: 0 0 8px 0;
    }
  }

  h2 {
    font-size: clamp(0.8rem, 3vw, 0.95rem);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
      "Helvetica Neue", sans-serif;
    font-weight: 500;
    color: #0071e3;
    margin: 0 0 16px 0;
    line-height: 1.3;

    @media (min-width: 480px) {
      font-size: clamp(0.85rem, 2.5vw, 1rem);
      margin: 0 0 20px 0;
    }
  }

  p {
    font-size: 0.9rem;
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
      "Helvetica Neue", sans-serif;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
    max-width: 540px;
    line-height: 1.6;
    text-align: center;
    margin: 0 0 20px 0;

    @media (min-width: 768px) {
      display: none;
    }
  }
`

const StyledPic = styled.div`
  position: relative;
  max-width: 100px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;

  @media (min-width: 480px) {
    max-width: 120px;
  }

  @media (min-width: 768px) {
    max-width: 130px;
  }

  @media (min-width: 1080px) {
    max-width: 140px;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover,
    &:focus {
      transform: scale(1.02);
    }

    .img {
      position: relative;
      border-radius: 50%;
      transition: var(--transition);
      box-shadow: ${({ theme }) =>
        theme.mode === "light"
          ? "0 4px 20px rgba(0, 0, 0, 0.1)"
          : "0 4px 20px rgba(0, 0, 0, 0.4)"};
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
