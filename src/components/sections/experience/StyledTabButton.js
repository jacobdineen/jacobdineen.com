import styled from "styled-components"

const StyledTabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) =>
    theme.mode === "light" ? "var(--slate)" : "var(--slate)"};
  font-size: var(--fz-xxs);
  width: auto;
  height: var(--tab-height);
  border: none;
  border-radius: 25px; /* More rounded corners */
  background-color: transparent;
  text-align: center;
  box-sizing: border-box;
  padding: 0 20px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: hidden;
  font-weight: 500;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "linear-gradient(120deg, rgba(100, 255, 218, 0.05), rgba(100, 255, 218, 0.1), rgba(100, 255, 218, 0.05))"
        : "linear-gradient(120deg, rgba(17, 34, 64, 0.7), rgba(17, 34, 64, 0.9), rgba(17, 34, 64, 0.7))"};
    border-radius: 25px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 10px 15px;
    margin: 5px 0;
  }

  &:hover,
  &:focus {
    color: ${({ theme }) =>
      theme.mode === "light" ? "var(--green-dark)" : "var(--green)"};
    box-shadow: 0 4px 10px
      ${({ theme }) =>
        theme.mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.3)"};
    transform: translateY(-2px);

    &:before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(1px);
  }

  ${({ isActive, theme }) =>
    isActive &&
    `
    background-color: transparent;
    color: ${theme.mode === "light" ? "var(--green-dark)" : "var(--green)"};
    box-shadow: 0 6px 14px ${
      theme.mode === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(0, 0, 0, 0.2)"
    };
    transform: scale(1.03);
    z-index: 1;
    font-weight: 600;
    
    &:before {
      opacity: 1;
      background: ${
        theme.mode === "light"
          ? "linear-gradient(120deg, rgba(100, 255, 218, 0.1), rgba(100, 255, 218, 0.2), rgba(100, 255, 218, 0.1))"
          : "linear-gradient(120deg, rgba(17, 34, 64, 0.8), rgba(17, 34, 64, 1), rgba(17, 34, 64, 0.8))"
      };
    }
  `}
`

export default StyledTabButton
