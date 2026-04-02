import React from "react"
import styled from "styled-components"

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 20px;
  text-align: center;
  border-top: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#1d1d1f")};
`

const StyledCredit = styled.div`
  font-size: 0.72rem;
  color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
  line-height: 1.6;

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
`

const Footer = () => {
  return (
    <StyledFooter>
      <StyledCredit tabIndex="-1">
        <div>
          Built by Jacob Dineen. Design inspired by{" "}
          <a
            href="https://brittanychiang.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Brittany Chiang
          </a>
          . Source on{" "}
          <a
            href="https://github.com/jacobdineen/jacobdineen.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </div>
      </StyledCredit>
    </StyledFooter>
  )
}

export default Footer
