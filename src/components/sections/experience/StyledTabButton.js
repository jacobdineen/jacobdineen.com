import styled from "styled-components"

const StyledTabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) =>
    theme.mode === "light" ? "var(--slate)" : "var(--slate)"};
  font-size: var(--fz-xs);
  height: 38px;
  width: 100%;
  max-width: 280px;
  border: none;
  border-radius: 19px;
  background-color: transparent;
  text-align: center;
  padding: 0 18px;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  outline: none;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 2px 0;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(100, 255, 218, 0.08)"
        : "rgba(17, 34, 64, 0.7)"};
    border-radius: 19px;
    opacity: 0;
    transition: opacity 0.25s ease;
    z-index: -1;
  }

  &:hover,
  &:focus {
    color: ${({ theme }) =>
      theme.mode === "light" ? "var(--green-dark)" : "var(--green)"};
    transform: translateY(-1px);

    &:before {
      opacity: 1;
    }
  }

  ${({ isActive, theme }) =>
    isActive &&
    `
    color: ${theme.mode === "light" ? "var(--green-dark)" : "var(--green)"};
    font-weight: 600;
    
    &:before {
      opacity: 1;
      background: ${
        theme.mode === "light"
          ? "rgba(100, 255, 218, 0.15)"
          : "rgba(17, 34, 64, 0.9)"
      };
    }
  `}

  @media (max-width: 768px) {
    font-size: var(--fz-xxs);
    height: 36px;
    max-width: 240px;
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    height: 34px;
    max-width: 220px;
    padding: 0 12px;
  }
`

export default StyledTabButton
