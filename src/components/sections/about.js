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
  gap: 4px;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 767px) {
    justify-content: flex-start;
  }

  @media (min-width: 768px) {
    gap: 6px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: transparent;
    border: none;
    border-radius: 6px;
    color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    }

    &:after {
      display: none;
    }

    @media (min-width: 768px) {
      width: 36px;
      height: 36px;
    }
  }

  svg {
    width: 16px;
    height: 16px;

    @media (min-width: 768px) {
      width: 18px;
      height: 18px;
    }
  }
`

const StyledAboutSection = styled.section`
  width: 100%;
  margin: 0 auto;
  background: transparent;
  padding: 0 !important;

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 0;
    width: 100%;
  }

  @media (max-width: 767px) {
    .inner {
      flex-direction: row;
      gap: 14px;
      padding: 0;
    }
  }

  @media (min-width: 768px) {
    .inner {
      gap: 16px;
      padding: 0;
    }
  }
`

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;

  @media (max-width: 767px) {
    align-items: flex-start;
    text-align: left;
  }

  h1 {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    margin: 0 0 2px 0;
    line-height: 1.3;
    letter-spacing: -0.02em;

    @media (min-width: 768px) {
      font-size: clamp(1.2rem, 2.5vw, 1.5rem);
      margin: 0 0 4px 0;
    }
  }

  h2 {
    font-size: 0.72rem;
    font-weight: 400;
    color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
    margin: 0 0 10px 0;
    line-height: 1.3;
    letter-spacing: 0;

    @media (min-width: 768px) {
      font-size: 0.82rem;
      margin: 0 0 16px 0;
    }
  }

  p {
    display: none;
  }
`

const StyledPic = styled.div`
  position: relative;
  width: 60px;
  min-width: 60px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 100px;
    min-width: 100px;
  }

  @media (min-width: 1080px) {
    width: 110px;
    min-width: 110px;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    border-radius: 50%;

    .img {
      position: relative;
      border-radius: 50%;
      box-shadow: none;
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
            <h2>PhD Student &middot; Arizona State University</h2>
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
                href="https://scholar.google.com/citations?user=WKurvcoAAAAJ&hl=en"
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
