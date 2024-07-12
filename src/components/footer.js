import React from "react"
import styled from "styled-components"

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 10px;
  text-align: center;
`

const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  line-height: 1;

  a {
    padding: 10px;
  }

  .github-stats {
    margin-top: 10px;

    & > span {
      display: inline-flex;
      align-items: center;
      margin: 0 7px;
    }

    svg {
      display: inline-block;
      margin-right: 5px;
      width: 14px;
      height: 14px;
    }
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <StyledCredit tabIndex="-1">
        <div>
          Built by Jacob Dineen with heavy design inspiration from Brittany
          Chiang
        </div>
      </StyledCredit>
    </StyledFooter>
  )
}

export default Footer
