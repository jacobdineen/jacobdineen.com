import styled from "styled-components"
import IconContainer from "./IconContainer"
import IconLink from "./IconLink"

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 0;
  max-width: 640px;
  margin: 0 auto;

  h3 {
    margin-bottom: 2px;
    font-size: 0.95rem;
    font-weight: 600;
    text-align: center;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    letter-spacing: -0.01em;
  }

  .range {
    font-size: 0.75rem;
    font-family: var(--font-mono);
    color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
    margin-bottom: 16px;
    text-align: center;
  }

  .edu-degree {
    font-size: 0.88rem;
    font-weight: 500;
    text-align: center;
    margin: 4px 0 2px;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  }

  .edu-meta {
    font-size: 0.78rem;
    font-family: var(--font-mono);
    text-align: center;
    margin: 0 0 4px;
    color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
  }

  .coursework {
    margin-top: 12px;
    text-align: center;
  }

  .coursework-toggle {
    background: none;
    border: none;
    color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
    font-size: 0.75rem;
    font-family: var(--font-mono);
    cursor: pointer;
    padding: 4px 0;
    transition: color 0.15s ease;

    &:hover {
      color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    }
  }

  .coursework-list {
    font-size: 0.76rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#86868b")};
    line-height: 1.7;
    margin-top: 8px;
    text-align: center;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .authors,
  .venue {
    font-size: 0.85rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#86868b")};
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    position: relative;
    padding: 4px 0 4px 20px;
    font-size: 0.84rem;
    line-height: 1.65;
    color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};
    text-align: left;

    &:before {
      content: "";
      position: absolute;
      left: 4px;
      top: 13px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: ${({ theme }) =>
        theme.mode === "light" ? "#d2d2d7" : "#424245"};
    }

    & + li {
      margin-top: 6px;
    }

    a {
      color: #0071e3;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        color: #0077ed;
      }

      &:after {
        display: none;
      }
    }
  }

  p {
    text-align: center;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  }

  ${IconContainer} {
    display: flex;
    justify-content: start;
    gap: 5px;
  }

  ${IconLink} {
    display: inline-flex;
    align-items: center;
    svg {
      width: 24px;
      height: 24px;
    }
  }

  @media (max-width: 768px) {
    padding: 16px 0;

    li {
      font-size: 0.82rem;
    }
  }
`

export default StyledTabPanel
