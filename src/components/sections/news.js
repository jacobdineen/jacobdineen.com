import React from "react"
import styled from "styled-components"

const StyledNewsSection = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 0;

  h2.numbered-heading {
    margin: 0 0 16px 0;
  }

  ul.news-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Timeline container */
  .timeline {
    position: relative;
    margin: 0;
    padding-left: 22px; /* space for the vertical line */
  }

  .timeline:before {
    content: "";
    position: absolute;
    left: 9px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      rgba(100, 255, 218, 0.5),
      rgba(100, 255, 218, 0.1)
    );
  }

  li.news-item {
    position: relative;
    display: grid;
    grid-template-columns: 140px 1fr;
    align-items: start;
    gap: 14px;
    padding: 14px 16px;
    background-color: var(--light-navy);
    border: 1px solid var(--lightest-navy);
    border-radius: var(--border-radius);
    box-shadow: 0 10px 24px -18px var(--navy-shadow);
  }

  /* Timeline dot */
  li.news-item:before {
    content: "";
    position: absolute;
    left: -14px;
    top: 18px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.15);
  }

  .news-date {
    font-family: var(--font-mono);
    color: var(--green);
    font-size: var(--fz-xs);
    white-space: nowrap;
  }

  .news-text {
    color: var(--lightest-slate);
    font-size: var(--fz-md);
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    li.news-item {
      grid-template-columns: 1fr;
      gap: 8px;
    }
  }
`

const News = () => {
  const items = [
    { date: "Aug 2025", text: "Two papers accepted in EMNLP 2025! 🎉" },
    { date: "Jan 2025", text: "One paper accepted in NAACL 2025! 🎉" },
    {
      date: "Aug 2024",
      text: "Joined AI Reasoning & Cognition (ARC) Lab and be advised by Prof. Ben Zhou",
    },
  ]

  return (
    <StyledNewsSection id="news">
      <h2 className="numbered-heading">News</h2>
      <ul className="news-list timeline">
        {items.map((item, idx) => (
          <li key={idx} className="news-item">
            <span className="news-date">{item.date}</span>
            <span className="news-text">{item.text}</span>
          </li>
        ))}
      </ul>
    </StyledNewsSection>
  )
}

export default News
