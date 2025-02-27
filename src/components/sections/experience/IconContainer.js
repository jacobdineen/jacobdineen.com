import styled from "styled-components"

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* Align icons to left by default */
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 15px;
  padding: 5px 0;

  /* For centering use case in publications */
  &.centered {
    justify-content: center;
  }

  @media (max-width: 768px) {
    justify-content: center;
    gap: 10px;
  }
`

export default IconContainer
