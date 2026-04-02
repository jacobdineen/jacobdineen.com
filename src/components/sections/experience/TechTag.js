import styled from "styled-components"

const TechTag = styled.a`
  display: inline-flex;
  align-items: center;
  margin: 2px;
  padding: 4px 12px;
  font-size: 0.72rem;
  font-family: var(--font-mono);
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(0, 113, 227, 0.06)"
      : "rgba(0, 113, 227, 0.1)"};
  color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};
  border-radius: 6px;
  text-decoration: none;
  transition: color 0.15s ease, border-color 0.15s ease;
  border: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};

  &:hover,
  &:focus {
    color: #0071e3;
    border-color: #0071e3;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(0, 113, 227, 0.08)"
        : "rgba(0, 113, 227, 0.15)"};
  }

  &:after {
    display: none !important;
  }
`

export default TechTag
