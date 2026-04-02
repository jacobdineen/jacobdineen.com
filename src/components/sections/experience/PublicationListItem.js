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
    ${({ isActive, theme }) =>
      isActive ? "#0071e3" : theme.mode === "light" ? "#e5e5ea" : "#2d2d2d"};
  background: ${({ isActive, theme }) =>
    isActive
      ? theme.mode === "light"
        ? "rgba(0, 113, 227, 0.04)"
        : "rgba(0, 113, 227, 0.08)"
      : "transparent"};
  color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  transition: border-color 0.1s ease, background-color 0.1s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) =>
      theme.mode === "light" ? "#c7c7cc" : "#424245"};
  }

  .title {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    margin-bottom: 6px;
    line-height: 1.4;
    letter-spacing: -0.01em;

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
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#86868b")};
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
    color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};

    .chip {
      border: 1px solid
        ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
      color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};
      font-family: var(--font-mono);
      font-size: 0.68rem;
      padding: 3px 8px;
      border-radius: 4px;
      background: transparent;
    }

    .date {
      color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
      font-family: var(--font-mono);
    }

    a.chip-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 6px;
      border: 1px solid
        ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
      color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#86868b")};
      text-decoration: none;
      transition: color 0.1s ease, border-color 0.1s ease;
      background: transparent;

      svg {
        width: 13px;
        height: 13px;
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
  }

  @media (max-width: 768px) {
    padding: 14px 16px;

    .title {
      font-size: 0.85rem;
    }

    .authors {
      font-size: 0.76rem;
    }
  }
`

export default PublicationListItem
