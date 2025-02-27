import styled from "styled-components"
import IconContainer from "./IconContainer"
import IconLink from "./IconLink"

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0;

  @media (max-width: 768px) {
    padding: 10px 0;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 10px 0;
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-md);
    font-weight: 1000;

    .company {
      font-size: var(--fz-md);
    }
  }

  .authors,
  .venue,
  .range {
    font-size: 0.9em;
    color: #666;
    margin-bottom: 0.5rem;
  }

  ${IconContainer} {
    display: flex;
    justify-content: start;
    gap: 5px;
  }

  ${IconLink} {
    display: inline-flex;
    align-items: center;
    svg {
      width: 24px;
      height: 24px;
    }
  }

  position: relative;
  transition: all 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -15px;
    width: 3px;
    height: 0;
    background-color: var(--green);
    transition: height 0.3s ease;
    border-radius: 3px;
    opacity: 0.6;
  }
  
  &:hover:before {
    height: 70%;
  }
`

export default StyledTabPanel
