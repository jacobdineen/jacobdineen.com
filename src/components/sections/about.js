import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { IconGitHub, IconLinkedin, IconGmail, } from '@components/icons';

const SidebarIcons = styled.aside`
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    &:not(:last-child) {
      margin-bottom: 20px;
    }

    svg {
      fill: currentColor; // This will take the color from the 'color' property
      width: 24px; // Adjust the size as needed
      height: 24px; // Adjust the size as needed
    }
  }
`;



const StyledAboutSection = styled.section`
  max-width: 500px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; // Align text to the left
  padding: 0;
  margin: 0;
  
  h1 {
    font-size: 1.5rem; // Large font size for the main title
    font-weight: 100; // Large font weight for the main title
    font-family: var(--font-mono); // Monospace font for the main title
    color: #ccd6f6; // Light text color
    margin: 0 0 20px 0; // Spacing after the title
  }

  h2 {
    font-size: 1.0rem; // Medium font size for the subtitle
    font-weight: 100; // Medium font weight for the subtitle
    font-family: var(--font-mono); // Monospace font for the main title
    color: #8892b0; // Subdued text color
    margin: 0 0 20px 0; // Spacing after the subtitle
  }

  p {
    font-size: 1.0rem; // Medium font size for the subtitle
    font-weight: 100; // Medium font weight for the subtitle
    font-family: var(--font-mono); // Monospace font for the main title
    color: #89CFEF; // Regular text color
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
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--blue);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  // const skills = ['PyTorch', 'TensorFlow', 'scikit-learn', 'Keras', 'OpenCV', 'Natural Language Processing (NLP)', 'Deep Learning', 'Machine Learning Engineering'];

  return (
    <>
      {/* Sidebar with icons */}

      {/* Main content */}
      <StyledAboutSection id="about" ref={revealContainer}>
        <div className="inner">
        <StyledPic>
            <div className="wrapper">
              <StaticImage
                className="img"
                src="../../images/me.jpg"
                width={500}
                quality={95}
                formats={['AUTO', 'WEBP', 'AVIF']}
                alt="Headshot"
              />
            </div>
          </StyledPic>
        <StyledText>
        <h1>Jacob Dineen</h1>
        <h2>Machine Learning Engineer & PhD Student</h2>
      </StyledText>

        </div>
      </StyledAboutSection>
      <SidebarIcons>
            <a href="https://github.com/jacobdineen" aria-label="GitHub">
              <IconGitHub />
            </a>
            <a href="https://www.linkedin.com/in/jacobdineen/" aria-label="Linkedin">
              <IconLinkedin />
            </a>

        <a href="jdineen82194@gmail.com" aria-label="Gm">
          <IconGmail />
        </a>
      </SidebarIcons>
    </>
  );
};

export default About;