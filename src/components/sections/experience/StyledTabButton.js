import styled from "styled-components"

const StyledTabButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 400;
  font-family: var(--font-mono);
  letter-spacing: -0.01em;
  border: none;
  border-radius: 0;
  background: transparent;
  padding: 4px 0;
  cursor: pointer;
  outline: none;
  white-space: nowrap;
  transition: color 0.1s ease;
  position: relative;
  color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.5px;
    background: transparent;
    transition: color 0.1s ease;
  }

  &:hover {
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  }

  ${({ isActive, theme }) =>
    isActive &&
    `
    color: ${theme.mode === "light" ? "#1d1d1f" : "#f5f5f7"};
    font-weight: 500;

    &:after {
      background: #0071e3;
    }
  `}

  @media (max-width: 480px) {
    font-size: 0.72rem;
  }
`

export default StyledTabButton
