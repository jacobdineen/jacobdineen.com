import styled from "styled-components"

const StyledJobsSection = styled.section`
  max-width: 700px;
  font-size: var(--fz-lg);

  .inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  ul.fancy-list li {
    font-size: 0.4rem;
    &:before {
      font-size: 0.64rem;
    }
  }

  @media (max-width: 768px) {
    font-size: var(--fz-xs);
  }

  @media (max-width: 600px) {
    margin-left: 0;
    padding: 0 10px;
    font-size: var(--fz-sm);
  }
`

export default StyledJobsSection
