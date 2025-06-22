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
  gap: 12px;
  margin-top: 8px;
  justify-content: center;
  flex-wrap: wrap;

  @media (min-width: 480px) {
    gap: 15px;
    margin-top: 10px;
  }

  a {
    color: var(--slate);
    transition: var(--transition);
    padding: 4px;
    border-radius: 4px;

    &:hover {
      color: var(--green);
      transform: translateY(-2px);
      background-color: rgba(100, 255, 218, 0.1);
    }
  }

  svg {
    width: 18px;
    height: 18px;

    @media (min-width: 480px) {
      width: 20px;
      height: 20px;
    }
  }
`

const StyledAboutSection = styled.section`
  width: 100%;
  margin: 0 auto;

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 5px 0;
    width: 100%;
  }

  @media (min-width: 480px) {
    .inner {
      gap: 15px;
      padding: 10px 0;
    }
  }
`

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 5px;
  width: 100%;

  h1 {
    font-size: clamp(1.1rem, 4vw, 1.3rem);
    font-weight: 400;
    font-family: var(--font-mono);
    color: var(--lightest-slate);
    margin: 0 0 4px 0;
    line-height: 1.2;

    @media (min-width: 480px) {
      font-size: clamp(1.2rem, 3vw, 1.4rem);
      margin: 0 0 6px 0;
    }
  }

  h2 {
    font-size: clamp(0.75rem, 3vw, 0.85rem);
    font-family: var(--font-mono);
    color: var(--green);
    margin: 0 0 8px 0;
    opacity: 0.85;
    line-height: 1.3;

    @media (min-width: 480px) {
      font-size: clamp(0.8rem, 2.5vw, 0.9rem);
      margin: 0 0 10px 0;
    }
  }

  p {
    display: none; /* Hide paragraph text in sidebar to save space */
  }
`

const StyledPic = styled.div`
  position: relative;
  max-width: 120px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;

  @media (min-width: 480px) {
    max-width: 140px;
  }

  @media (min-width: 768px) {
    max-width: 150px;
  }

  @media (min-width: 1080px) {
    max-width: 160px;
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
