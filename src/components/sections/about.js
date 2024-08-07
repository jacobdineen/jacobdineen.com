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
  flex-direction: row; // Keep icons in a row
  justify-content: center; // Center icons horizontally
  align-items: center; // Center icons vertically
  width: 100%; // Ensure the container takes full width
  margin-top: 20px; // Space between the picture and icons

  a {
    &:not(:last-child) {
      margin-right: 20px; // Spacing between icons

      @media (max-width: 768px) {
        margin-right: 15px; // Adjust spacing between icons on mobile
      }
    }
  }

  svg {
    fill: currentColor;
    width: 24px;
    height: 24px;

    @media (max-width: 768px) {
      width: 25px; // Increase icon size on mobile
      height: 25px; // Increase icon size on mobile
    }
  }
`

const StyledAboutSection = styled.section`
  max-width: 500px;
  margin: 0 auto; // Center the section

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 10px; // Space between elements
    padding: 0; // No padding

    @media (max-width: 768px) {
      display: block;
      margin-bottom: -30px; // Adjust to reduce space at the bottom on mobile
    }

    @media (min-width: 769px) {
      margin-bottom: -70px; // Adjust to reduce space at the bottom on desktop
    }
  }
`;

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // Center text
  padding: 0;
  margin: 0;

  h1 {
    font-size: 1.2rem; // Large font size for the main title
    font-weight: 100; // Large font weight for the main title
    font-family: var(--font-mono); // Monospace font for the main title
    color: #ccd6f6; // Light text color
    margin: 0 0 10px 0; // Spacing after the title
  }

  h2 {
    font-size: 0.85rem; // Medium font size for the subtitle
    font-family: var(--font-mono); // Monospace font for the main title
    color: #8892b0; // Subdued text color
    margin: 0 0 20px 0; // Spacing after the subtitle
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
  max-width: 200px;
  display: flex;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 150%; /* Increased width for mobile */
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--black-tint);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: "";
      display: flex;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 20;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--blue);
      top: 1px;
      left: 14px;
      z-index: -1;
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
            <h2> CS PhD Student / MLE</h2>
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
