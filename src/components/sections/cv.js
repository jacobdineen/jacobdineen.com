import React, { useState } from "react"
import styled from "styled-components"

const StyledCVSection = styled.section`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 0;

  h2.numbered-heading {
    margin: 0 0 20px 0;
  }

  .cv-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};
  }

  .cv-toolbar-actions {
    display: flex;
    gap: 6px;
  }

  .cv-action {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#2d2d2d")};
    color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.02em;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    transition: color 0.1s ease, border-color 0.1s ease;

    &:hover {
      color: #0071e3;
      border-color: #0071e3;
    }

    &:after {
      display: none;
    }
  }

  .cv-frame {
    width: 100%;
    height: 560px;
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
    border-radius: 8px;
    background: ${({ theme }) =>
      theme.mode === "light" ? "#f5f5f7" : "#1d1d1f"};
    overflow: hidden;
    transition: height 0.25s ease;
  }

  .cv-frame.expanded {
    height: 90vh;
  }

  @media (max-width: 767px) {
    .cv-frame {
      height: 420px;
    }
    .cv-frame.expanded {
      height: 80vh;
    }
  }

  .cv-frame iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }

  @media (max-width: 600px) {
    .cv-toolbar {
      font-size: 0.66rem;
    }
    .cv-action {
      padding: 3px 8px;
      font-size: 0.66rem;
    }
  }
`

const Cv = () => {
  const [expanded, setExpanded] = useState(false)
  const cvUrl = "/cv/JacobDineen_CV.pdf"

  return (
    <StyledCVSection id="cv">
      <h2 className="numbered-heading">CV</h2>
      <div className="cv-toolbar">
        <span>{expanded ? "expanded view" : "preview"}</span>
        <div className="cv-toolbar-actions">
          <button
            className="cv-action"
            onClick={() => setExpanded(e => !e)}
            aria-label={expanded ? "Collapse CV" : "Expand CV"}
          >
            {expanded ? "collapse" : "expand"}
          </button>
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cv-action"
          >
            open in tab
          </a>
          <a href={cvUrl} download className="cv-action">
            download
          </a>
        </div>
      </div>
      <div className={`cv-frame${expanded ? " expanded" : ""}`}>
        <iframe
          src={`${cvUrl}#view=FitH`}
          title="Jacob Dineen CV"
          loading="lazy"
        />
      </div>
    </StyledCVSection>
  )
}

export default Cv
