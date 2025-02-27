import styled from "styled-components"

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${({ theme }) =>
    theme.mode === "light" ? "var(--slate)" : "var(--slate)"};
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  width: 35px;
  height: 35px;
  border-radius: 50%;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(100, 255, 218, 0.1)"
        : "rgba(100, 255, 218, 0.05)"};
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.2s ease;
    z-index: -1;
  }

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
    transition: all 0.2s ease;
  }

  &:hover,
  &:focus {
    color: ${({ theme }) =>
      theme.mode === "light" ? "var(--green-dark)" : "var(--green)"};
    transform: translateY(-3px);

    &:before {
      transform: scale(1);
    }

    svg {
      transform: scale(1.1);
    }
  }

  &:active {
    transform: translateY(1px);
  }
`

export default IconLink
