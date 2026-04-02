import styled from "styled-components"

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
  transition: color 0.15s ease;
  width: 32px;
  height: 32px;
  border-radius: 6px;

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }

  &:hover,
  &:focus {
    color: #0071e3;
  }

  &:after {
    display: none;
  }
`

export default IconLink
