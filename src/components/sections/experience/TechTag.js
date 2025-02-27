import styled from "styled-components"

const TechTag = styled.a`
  display: inline-flex;
  align-items: center;
  margin: 2px;
  padding: 3px 12px;
  font-size: 0.75em;
  background-color: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(100, 255, 218, 0.1)"
      : "rgba(17, 34, 64, 0.95)"};
  color: ${({ theme }) =>
    theme.mode === "light" ? "var(--dark-slate)" : "var(--green)"};
  border-radius: 15px;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid
    ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(100, 255, 218, 0.3)"
        : "rgba(100, 255, 218, 0.1)"};
  font-family: var(--font-mono);

  &:hover,
  &:focus {
    background-color: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(100, 255, 218, 0.2)"
        : "rgba(10, 25, 47, 0.95)"};
    color: ${({ theme }) =>
      theme.mode === "light" ? "var(--dark-navy)" : "var(--lightest-slate)"};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px
      ${({ theme }) =>
        theme.mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.3)"};
  }

  &:active {
    transform: translateY(1px);
  }
`

export default TechTag
