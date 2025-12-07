import styled from "styled-components"

const StyledTabList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 10px 0 15px 0;
  font-size: var(--fz-lg);

  /* The container for the tab buttons */
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    margin: 0 auto;
    width: 100%;
    max-width: 900px;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 768px) {
    > div {
      -webkit-overflow-scrolling: touch;
      max-width: 100%;
      padding: 8px 0;
      gap: 10px;
    }
  }

  @media (max-width: 480px) {
    padding: 8px 0 12px 0;

    > div {
      max-width: 100%;
      gap: 8px;
    }
  }
`

export default StyledTabList
