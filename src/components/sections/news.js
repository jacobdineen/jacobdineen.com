import React from "react"
import styled from "styled-components"

const StyledNewsSection = styled.section`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0;

  h2.numbered-heading {
    margin: 0 0 24px 0;
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
    padding-left: 22px;
  }

  .timeline:before {
    content: "";
    position: absolute;
    left: 9px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "linear-gradient(to bottom, rgba(0, 113, 227, 0.4), rgba(0, 113, 227, 0.1))"
        : "linear-gradient(to bottom, rgba(0, 113, 227, 0.6), rgba(0, 113, 227, 0.1))"};
  }

  li.news-item {
    position: relative;
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background-color: ${({ theme }) =>
      theme.mode === "light" ? "#ffffff" : "#161616"};
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${({ theme }) =>
        theme.mode === "light" ? "#d2d2d7" : "#3d3d3d"};
    }
  }

  /* Timeline dot */
  li.news-item:before {
    content: "";
    position: absolute;
    left: -14px;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #0071e3;
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(0, 113, 227, 0.15)"
          : "rgba(0, 113, 227, 0.25)"};
  }

  .news-date {
    font-family: var(--font-mono);
    color: #0071e3;
    font-size: var(--fz-xs);
    font-weight: 500;
    white-space: nowrap;
  }

  .news-text {
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    font-size: var(--fz-md);
    line-height: 1.5;
  }

  @media (max-width: 600px) {
    .timeline {
      padding-left: 18px;
    }

    li.news-item {
      grid-template-columns: 80px 1fr;
      gap: 12px;
      padding: 14px 16px;
    }

    li.news-item:before {
      left: -10px;
      width: 8px;
      height: 8px;
    }

    .news-date {
      font-size: 11px;
    }

    .news-text {
      font-size: var(--fz-sm);
    }
  }

  @media (max-width: 400px) {
    li.news-item {
      grid-template-columns: 1fr;
      gap: 6px;
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
