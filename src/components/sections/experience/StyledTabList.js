import styled from "styled-components"

const StyledTabList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  position: relative;
  padding: 40px 0 20px 0;
  font-size: var(--fz-lg);
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--green) transparent;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 5px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(100, 255, 218, 0.3)"
        : "rgba(100, 255, 218, 0.2)"};
    border-radius: 10px;
  }

  /* Add horizontal padding to create space for scrolling */
  > div {
    display: flex;
    gap: 10px;
    padding: 0 5px;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding: 30px 0 15px 0;
  }

  @media (max-width: 600px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0 -10px;
    padding: 20px 10px 10px;

    &:after {
      content: "";
      padding-left: 20px;
    }
  }
`

export default StyledTabList
