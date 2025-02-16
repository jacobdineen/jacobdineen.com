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
} from "@components/icons"

const SidebarIcons = styled.aside`
  display: flex;
  gap: 15px;
  margin-top: 0;

  a {
    color: var(--slate);
    transition: var(--transition);

    &:hover {
      color: var(--green);
      transform: translateY(-2px);
    }
  }

  svg {
    width: 20px;
    height: 20px;

    @media (max-width: 768px) {
      width: 18px;
      height: 18px;
    }
  }
`

const StyledAboutSection = styled.section`
  max-width: 600px;
  margin: 0 auto -30px;

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 0;
  }
`

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 5px;
  margin-bottom: -20px;

  h1 {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    font-weight: 400;
    font-family: var(--font-mono);
    color: var(--lightest-slate);
    margin: 0 0 5px 0;
  }

  h2 {
    font-size: clamp(0.85rem, 2vw, 0.95rem);
    font-family: var(--font-mono);
    color: var(--green);
    margin: 0 0 10px 0;
    opacity: 0.85;
  }

  p {
    font-size: 1rem; // Medium font size for the subtitle
    font-weight: 100; // Medium font weight for the subtitle
    font-family: var(--font-mono); // Monospace font for the main title
    color: #89cfef; // Regular text color
    max-width: 540px; // Max width for paragraph text, adjust as necessary
    line-height: 1.5; // Line height for paragraph text
  }
`

const StyledPic = styled.div`
  position: relative;
  max-width: 180px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: 160px;
    margin: 10px auto 0;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    border-radius: 50%;
    background-color: transparent;

    &:hover,
    &:focus {
      transform: translateY(-3px);
      transition: var(--transition);
    }

    .img {
      position: relative;
      border-radius: 50%;
      transition: var(--transition);
      border: 2px solid var(--green-tint);
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid var(--green);
      top: 8px;
      left: 8px;
      z-index: -1;
      transition: var(--transition);
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

              <a href="mailto:jdineen81294@gmail.com" aria-label="Send email">
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
