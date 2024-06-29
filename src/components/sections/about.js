import React, { useEffect, useRef } from "react";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { srConfig } from "@config";
import sr from "@utils/sr";
import { usePrefersReducedMotion } from "@hooks";
import {
  IconGitHub,
  IconLinkedin,
  IconGmail,
  IconGScholar,
  IconSemanticScholar,
} from "@components/icons";

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
    }
  }

  svg {
    fill: currentColor;
    width: 24px;
    height: 24px;
  }
`;

const StyledAboutSection = styled.section`
  max-width: 500px;
  margin: 0 auto; // Center the section

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 20px; // Space between elements

    @media (max-width: 768px) {
      display: block;
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
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 200px;
  display: flex;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
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
`;

const ThemeToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const ThemeToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & input:checked + span {
    background-color: ${(props) => (props.isDarkMode ? "#2196F3" : "#ccc")};
  }

  & input:checked + span:before {
    transform: translateX(26px);
  }
`;

const ThemeToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.isDarkMode ? "#ccc" : "#2196F3")};
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const ThemeToggleText = styled.span`
  margin-left: 10px;
  color: ${(props) => (props.isDarkMode ? "#ffffff" : "#000000")};
`;

const About = ({ isDarkMode, toggleTheme }) => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
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
          <ThemeToggleWrapper>
            <ThemeToggleLabel>
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <ThemeToggleSlider isDarkMode={isDarkMode} />
            </ThemeToggleLabel>
            <ThemeToggleText isDarkMode={isDarkMode}>
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </ThemeToggleText>
          </ThemeToggleWrapper>
        </StyledText>
      </div>
    </StyledAboutSection>
  );
};

export default About;
