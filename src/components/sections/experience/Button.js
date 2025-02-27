import styled from "styled-components"

const Button = styled.button`
  background-color: ${({ theme, outlined }) =>
    outlined
      ? "transparent"
      : theme.mode === "light"
      ? "var(--green)"
      : "var(--green)"};
  color: ${({ theme, outlined }) =>
    outlined
      ? theme.mode === "light"
        ? "var(--green-dark)"
        : "var(--green)"
      : theme.mode === "light"
      ? "var(--navy)"
      : "var(--navy)"};
  padding: 8px 16px;
  border-radius: 6px;
  border: ${({ outlined }) => (outlined ? "1px solid var(--green)" : "none")};
  cursor: pointer;
  margin: 5px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  overflow: hidden;
  font-family: var(--font-mono);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 70%
    );
    transform: scale(0);
    transition: transform 0.5s ease;
    border-radius: 6px;
  }

  &:hover,
  &:focus {
    background-color: ${({ outlined, theme }) =>
      outlined
        ? theme.mode === "light"
          ? "rgba(100, 255, 218, 0.1)"
          : "rgba(100, 255, 218, 0.1)"
        : "#89efac"};
    transform: translateY(-3px);
    box-shadow: 0 5px 10px
      ${({ theme }) =>
        theme.mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.3)"};

    &:before {
      transform: scale(2);
    }
  }

  &:active {
    transform: translateY(1px);
  }

  /* Optional sizes */
  &.small {
    padding: 6px 12px;
    font-size: 0.75rem;
  }

  &.large {
    padding: 10px 20px;
    font-size: 1rem;
  }
`

export default Button
