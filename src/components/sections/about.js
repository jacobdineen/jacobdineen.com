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
    gap: 12px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(15, 23, 42, 0.8)"};
    backdrop-filter: blur(10px);
    border: 1px solid
      ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(226, 232, 240, 0.8)"
          : "rgba(100, 255, 218, 0.1)"};
    border-radius: 12px;
    color: ${({ theme }) => (theme.mode === "light" ? "#475569" : "#94a3b8")};
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: ${({ theme }) =>
      theme.mode === "light"
        ? "0 4px 16px rgba(0, 0, 0, 0.08)"
        : "0 4px 16px rgba(0, 0, 0, 0.2)"};

    &:hover {
      transform: translateY(-4px) scale(1.05);
      background: ${({ theme }) =>
        theme.mode === "light"
          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          : "linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)"};
      color: white;
      border-color: transparent;
      box-shadow: ${({ theme }) =>
        theme.mode === "light"
          ? "0 12px 32px rgba(102, 126, 234, 0.3)"
          : "0 12px 32px rgba(0, 201, 255, 0.3)"};
    }

    @media (min-width: 480px) {
      width: 48px;
      height: 48px;
    }
  }

  svg {
    width: 20px;
    height: 20px;
    transition: all 0.3s ease;

    @media (min-width: 480px) {
      width: 22px;
      height: 22px;
    }
  }
`

const StyledAboutSection = styled.section`
  width: 100%;
  margin: 0 auto;
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)"
      : "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)"};
  backdrop-filter: blur(10px);
  border: 1px solid
    ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(226, 232, 240, 0.8)"
        : "rgba(100, 255, 218, 0.1)"};
  border-radius: 24px;
  box-shadow: ${({ theme }) =>
    theme.mode === "light"
      ? "0 8px 32px rgba(0, 0, 0, 0.08)"
      : "0 8px 32px rgba(0, 0, 0, 0.3)"};

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
    font-weight: 700;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", sans-serif;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "linear-gradient(135deg, #2d3748 0%, #4a5568 100%)"
        : "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)"};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 8px 0;
    line-height: 1.2;
    letter-spacing: -0.02em;

    @media (min-width: 480px) {
      font-size: clamp(1.4rem, 3vw, 1.8rem);
      margin: 0 0 10px 0;
    }
  }

  h2 {
    font-size: clamp(0.8rem, 3vw, 0.95rem);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      sans-serif;
    font-weight: 500;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)"};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 12px 0;
    line-height: 1.3;
    letter-spacing: 0.02em;

    @media (min-width: 480px) {
      font-size: clamp(0.85rem, 2.5vw, 1rem);
      margin: 0 0 16px 0;
    }
  }

  p {
    font-size: 0.9rem;
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      sans-serif;
    color: ${({ theme }) => (theme.mode === "light" ? "#64748b" : "#94a3b8")};
    max-width: 540px;
    line-height: 1.6;
    text-align: center;
    margin: 0 0 20px 0;

    @media (min-width: 768px) {
      display: none; /* Hide paragraph text in desktop sidebar to save space */
    }
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
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)"};
    padding: 4px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &:hover,
    &:focus {
      transform: translateY(-8px) scale(1.05);
      box-shadow: ${({ theme }) =>
        theme.mode === "light"
          ? "0 20px 40px rgba(102, 126, 234, 0.3)"
          : "0 20px 40px rgba(0, 201, 255, 0.3)"};
    }

    .img {
      position: relative;
      border-radius: 50%;
      transition: var(--transition);
      border: 3px solid
        ${({ theme }) =>
          theme.mode === "light"
            ? "rgba(255,255,255,0.9)"
            : "rgba(15, 23, 42, 0.9)"};
      box-shadow: ${({ theme }) =>
        theme.mode === "light"
          ? "0 8px 32px rgba(0, 0, 0, 0.12)"
          : "0 8px 32px rgba(0, 0, 0, 0.4)"};
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
