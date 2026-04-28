import React from "react"
import styled from "styled-components"

const StyledFooter = styled.footer`
  width: 100%;
  max-width: 700px;
  margin: 48px auto 24px;
  padding: 20px 0 0;
  border-top: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    }

    &:after {
      display: none;
    }
  }

  @media (max-width: 480px) {
    margin-top: 36px;
    font-size: 0.66rem;
  }
`

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <StyledFooter>
      <span>© {year} Jacob Dineen · Phoenix, AZ</span>
      <span>
        Built with{" "}
        <a
          href="https://www.gatsbyjs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gatsby
        </a>{" "}
        ·{" "}
        <a
          href="https://github.com/jacobdineen/jacobdineen.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          source
        </a>
      </span>
    </StyledFooter>
  )
}

export default Footer
