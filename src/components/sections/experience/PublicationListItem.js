import styled from "styled-components"

const PublicationListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  text-align: left;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
  background: transparent;
  color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  transition: border-color 0.1s ease;
  position: relative;

  ${({ featuredAccent }) =>
    featuredAccent &&
    `
      border-left-width: 3px;
      border-left-color: #0071e3;
      padding-left: 18px;
    `}

  &:hover {
    border-color: ${({ theme }) =>
      theme.mode === "light" ? "#a1a1a6" : "#424245"};
    ${({ featuredAccent }) => featuredAccent && `border-left-color: #0071e3;`}
  }

  .title {
    font-family: var(--font-serif);
    font-size: 1.05rem;
    font-weight: 500;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    margin-bottom: 6px;
    line-height: 1.3;
    letter-spacing: -0.015em;
    font-variation-settings: "opsz" 96;

    a {
      color: inherit;
      text-decoration: none;

      &:after {
        display: none;
      }
    }

    a:hover {
      color: #0071e3;
    }
  }

  .authors {
    font-size: 0.8rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};
    margin-bottom: 10px;
    line-height: 1.5;

    .me {
      color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
      font-weight: 500;
    }

    a {
      color: inherit;
      text-decoration: none;

      &:after {
        display: none;
      }
    }

    a:hover {
      color: #0071e3;
    }
  }

  .meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 0.75rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};

    .chip {
      border: 1px solid
        ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#2d2d2d")};
      color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
      font-family: var(--font-mono);
      font-size: 0.68rem;
      padding: 3px 8px;
      border-radius: 4px;
      background: transparent;
    }

    .chip.tier-top {
      color: ${({ theme }) => (theme.mode === "light" ? "#0058b0" : "#6cb4ff")};
      border-color: ${({ theme }) =>
        theme.mode === "light" ? "#b3d4f5" : "#1f4a75"};
      background: ${({ theme }) =>
        theme.mode === "light" ? "#eef5fd" : "rgba(10, 132, 255, 0.12)"};
    }

    .chip.tier-conf {
      color: ${({ theme }) => (theme.mode === "light" ? "#2f6b3a" : "#7fd08e")};
      border-color: ${({ theme }) =>
        theme.mode === "light" ? "#bfdcc4" : "#2b5234"};
      background: ${({ theme }) =>
        theme.mode === "light" ? "#f1f8f2" : "rgba(52, 199, 89, 0.10)"};
    }

    .chip.tier-ws {
      color: ${({ theme }) => (theme.mode === "light" ? "#8a5a00" : "#f0b85c")};
      border-color: ${({ theme }) =>
        theme.mode === "light" ? "#ecd3a4" : "#5c4520"};
      background: ${({ theme }) =>
        theme.mode === "light" ? "#fdf7ec" : "rgba(255, 159, 10, 0.10)"};
    }

    .chip.tier-pre {
      border-style: dashed;
    }

    .date {
      color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};
      font-family: var(--font-mono);
    }

    a.chip-link,
    button.chip-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 9px;
      border-radius: 4px;
      border: 1px solid
        ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#2d2d2d")};
      color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};
      font-family: var(--font-mono);
      font-size: 0.7rem;
      letter-spacing: 0.02em;
      text-decoration: none;
      transition: color 0.1s ease, border-color 0.1s ease;
      background: transparent;
      white-space: nowrap;

      svg {
        width: 11px;
        height: 11px;
        display: block;
      }

      &:hover {
        color: #0071e3;
        border-color: #0071e3;
      }

      &:after {
        display: none;
      }
    }

    button.chip-link {
      cursor: pointer;
      line-height: inherit;

      &.copied {
        color: #34a853;
        border-color: #34a853;
      }
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 10px;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.04em;
    text-transform: lowercase;
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
    background: transparent;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
    cursor: pointer;
    transition: color 0.1s ease, border-color 0.1s ease,
      background-color 0.1s ease;

    &:hover {
      color: #0071e3;
      border-color: #0071e3;
    }

    &.active {
      color: #ffffff;
      background: #0071e3;
      border-color: #0071e3;
    }
  }

  @media (max-width: 768px) {
    padding: 14px 16px;

    .title {
      font-size: 0.98rem;
    }

    .authors {
      font-size: 0.76rem;
    }
  }
`

export default PublicationListItem
