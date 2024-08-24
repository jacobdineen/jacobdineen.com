import React from "react"
import styled from "styled-components"
import { FaGithub } from "react-icons/fa" // GitHub icon from react-icons

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  background: #1a1a1a; /* Dark background color */
  color: #e0e0e0; /* Light text color */
  min-height: 100px;
  padding: 20px;
  text-align: center;
  border-top: 2px solid #333; /* Slightly darker top border */
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.3); /* Soft shadow for depth */
`

const StyledCredit = styled.div`
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #4caf50; /* Green color for the link */
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease, transform 0.3s ease; /* Smooth color and scale transition */
    display: inline-flex;
    align-items: center;

    &:hover {
      color: #81c784; /* Lighter green on hover */
      transform: translateY(-2px); /* Slight lift on hover */
    }

    svg {
      margin-left: 8px; /* Space between text and icon */
      vertical-align: middle; /* Align icon vertically with text */
      transition: fill 0.3s ease; /* Smooth color transition */
    }
  }

  .github-stats {
    margin-top: 10px;

    & > span {
      display: inline-flex;
      align-items: center;
      margin: 0 7px;
      color: #b0b0b0; /* Light color for stats */
    }

    svg {
      display: inline-block;
      margin-right: 5px;
      width: 16px; /* Larger icons */
      height: 16px;
      fill: currentColor; /* Inherit color from parent */
    }
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <StyledCredit tabIndex="-1">
        <div>
          Built by Jacob Dineen with design inspiration from Brittany Chiang.
          Source code available on{" "}
          <a
            href="https://github.com/jacobdineen/jacobdineen.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <FaGithub />
          </a>
        </div>
      </StyledCredit>
    </StyledFooter>
  )
}

export default Footer
