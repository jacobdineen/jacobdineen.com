import styled from "styled-components"

const StyledTabList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 4px 0;

  @media (max-width: 480px) {
    gap: 10px;
  }
`

export default StyledTabList
