import styled from "styled-components"

const StyledJobsSection = styled.section`
  max-width: 100%;
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0 auto 32px;

  .inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    width: 100%;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    margin-bottom: 24px;
  }
`

export default StyledJobsSection
