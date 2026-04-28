import styled from "styled-components"

const EntryListItem = styled.div`
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

  &:hover {
    border-color: ${({ theme }) =>
      theme.mode === "light" ? "#a1a1a6" : "#424245"};
  }

  .title {
    display: block;
    font-family: var(--font-serif);
    font-size: 1.05rem;
    font-weight: 500;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    line-height: 1.3;
    letter-spacing: -0.015em;
    margin-bottom: 4px;
    font-variation-settings: "opsz" 96;
  }

  .subtitle {
    font-size: 0.8rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};
    margin-bottom: 6px;
  }

  .meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
    font-size: 0.75rem;

    .chip {
      border: 1px solid
        ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#2d2d2d")};
      color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
      font-family: var(--font-mono);
      font-size: 0.68rem;
      padding: 2px 7px;
      border-radius: 4px;
      background: transparent;
    }
  }

  .body {
    width: 100%;
    margin-top: 4px;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};

    &.collapsed li:nth-of-type(n + 3) {
      display: none;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      position: relative;
      padding: 2px 0 2px 16px;
      font-size: 0.8rem;
      line-height: 1.55;

      &:before {
        content: "";
        position: absolute;
        left: 4px;
        top: 12px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: ${({ theme }) =>
          theme.mode === "light" ? "#d2d2d7" : "#6e6e73"};
      }
    }

    p {
      font-size: 0.8rem;
      line-height: 1.55;
      margin: 6px 0;
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

    strong {
      color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    }
  }

  .coursework {
    width: 100%;
    margin-top: 6px;
  }

  .card-toggle,
  .coursework-toggle {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};
    font-size: 0.74rem;
    font-family: var(--font-mono);
    cursor: pointer;
    padding: 0;
    margin-top: 8px;
    transition: color 0.15s ease;

    svg {
      width: 11px;
      height: 11px;
      transition: transform 0.2s ease;
    }

    &:hover {
      color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    }
  }

  .card-toggle.expanded svg,
  .coursework-toggle.expanded svg {
    transform: rotate(90deg);
  }

  .coursework-list {
    font-size: 0.74rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};
    line-height: 1.7;
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    padding: 14px 16px;

    .title {
      font-size: 0.98rem;
    }
  }
`

export default EntryListItem
