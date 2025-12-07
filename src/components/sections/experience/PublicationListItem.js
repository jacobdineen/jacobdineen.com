import styled from "styled-components"

const PublicationListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  text-align: left;
  padding: 20px 24px;
  border-radius: 12px;
  border: 1px solid
    ${({ isActive, theme }) =>
      isActive ? "#0071e3" : theme.mode === "light" ? "#e5e5ea" : "#2d2d2d"};
  background: ${({ isActive, theme }) =>
    isActive
      ? theme.mode === "light"
        ? "rgba(0, 113, 227, 0.06)"
        : "rgba(0, 113, 227, 0.12)"
      : theme.mode === "light"
      ? "#ffffff"
      : "#161616"};
  color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) =>
      theme.mode === "light" ? "#0071e3" : "#0071e3"};
    box-shadow: ${({ theme }) =>
      theme.mode === "light"
        ? "0 2px 8px rgba(0, 0, 0, 0.06)"
        : "0 2px 8px rgba(0, 0, 0, 0.2)"};
  }

  .title {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    margin-bottom: 10px;
    line-height: 1.4;

    a {
      color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
      text-decoration: none;
      transition: color 0.2s ease;
    }

    a:hover {
      color: #0071e3;
    }
  }

  .authors {
    font-size: 0.85rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};
    margin-bottom: 12px;
    line-height: 1.5;
    max-width: 100%;

    .me {
      color: #0071e3;
      font-weight: 600;
    }

    a {
      color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};
      text-decoration: none;
      transition: color 0.2s ease;
    }

    a:hover {
      color: #0071e3;
    }

    a:focus-visible {
      color: #0071e3;
      outline: 2px solid #0071e3;
      outline-offset: 2px;
    }
  }

  .meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    font-size: 0.8rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#86868b")};

    .chip {
      border: 1px solid
        ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#3d3d3d")};
      color: #0071e3;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 6px;
      background: ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(0, 113, 227, 0.06)"
          : "rgba(0, 113, 227, 0.12)"};
    }

    .date {
      color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#86868b")};
    }

    a.chip-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 8px;
      border: 1px solid
        ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#3d3d3d")};
      color: #0071e3;
      text-decoration: none;
      transition: all 0.2s ease;
      background: transparent;

      svg {
        width: 15px;
        height: 15px;
        display: block;
      }

      &:hover {
        background: rgba(0, 113, 227, 0.08);
        border-color: #0071e3;
      }

      &:focus-visible {
        outline: 2px solid #0071e3;
        outline-offset: 2px;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 16px 18px;
    .title {
      font-size: 0.95rem;
    }
    .authors {
      font-size: 0.8rem;
    }
    .meta {
      font-size: 0.75rem;
    }
  }
`

export default PublicationListItem
