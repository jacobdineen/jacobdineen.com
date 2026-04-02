import styled from "styled-components"

const StyledTabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 4px 0 20px 0;
  border-bottom: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};

  @media (max-width: 480px) {
    gap: 14px;
    padding: 4px 0 16px 0;
  }
`

export default StyledTabList
