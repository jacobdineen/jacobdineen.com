import styled from "styled-components"

const StyledTabList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center; /* Center align items */
  max-width: 100%;
  position: relative;
  padding: 50px 20px 10px 20px; /* Reduced bottom padding to 10px */
  font-size: var(--fz-lg);

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`

export default StyledTabList
