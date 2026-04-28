import React from "react"
import styled from "styled-components"

const StyledNewsSection = styled.section`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 0;

  h2.numbered-heading {
    margin: 0 0 20px 0;
  }

  ul.news-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  li.news-item {
    display: grid;
    grid-template-columns: 80px 1fr;
    align-items: baseline;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#1d1d1f")};

    &:last-child {
      border-bottom: none;
    }
  }

  .news-date {
    font-family: var(--font-mono);
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};
    font-size: 0.72rem;
    font-weight: 400;
    white-space: nowrap;
  }

  .news-text {
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    font-size: 0.84rem;
    line-height: 1.5;

    a {
      color: #0071e3;
      font-weight: 500;
      text-decoration: none;

      &:hover {
        color: #0077ed;
      }

      &:after {
        display: none;
      }
    }
  }

  @media (max-width: 600px) {
    li.news-item {
      grid-template-columns: 68px 1fr;
      gap: 10px;
      padding: 8px 0;
    }

    .news-date {
      font-size: 0.68rem;
    }

    .news-text {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 400px) {
    li.news-item {
      grid-template-columns: 1fr;
      gap: 4px;
    }
  }
`

const News = () => (
  <StyledNewsSection id="news">
    <h2 className="numbered-heading">News</h2>
    <ul className="news-list">
      <li className="news-item">
        <span className="news-date">Apr 2026</span>
        <span className="news-text">
          <a href="/publications/visual-analogies-2025">VisAnalog</a> accepted
          at the CVPR Workshop on Visual Concepts (VisCon) 2026.
        </span>
      </li>
      <li className="news-item">
        <span className="news-date">Apr 2026</span>
        <span className="news-text">
          <a href="/publications/recap-2025">RECAP</a> accepted at the 8th
          Clinical NLP Workshop (Oral) at LREC-COLING 2026.
        </span>
      </li>
      <li className="news-item">
        <span className="news-date">Aug 2025</span>
        <span className="news-text">
          Two papers accepted at EMNLP 2025:{" "}
          <a href="/publications/qa-lign-2025">QA-LIGN</a> and{" "}
          <a href="/publications/thinktuning-2025">ThinkTuning</a>.
        </span>
      </li>
      <li className="news-item">
        <span className="news-date">Jan 2025</span>
        <span className="news-text">
          <a href="/publications/tow-2024">ToW</a> accepted at NAACL 2025.
        </span>
      </li>
      <li className="news-item">
        <span className="news-date">Aug 2024</span>
        <span className="news-text">
          Joined AI Reasoning & Cognition (ARC) Lab, advised by Prof. Ben Zhou.
        </span>
      </li>
    </ul>
  </StyledNewsSection>
)

export default News
