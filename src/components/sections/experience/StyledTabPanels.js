import styled from "styled-components"

const StyledTabPanels = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 0 10px;
  max-width: 100vw;
  box-sizing: border-box;

  /* Add responsive styling for mobile devices */
  @media (max-width: 768px) {
    padding: 0 8px;
    margin-top: 15px;
    overflow-x: hidden;
    width: calc(100% - 16px);
  }

  @media (max-width: 480px) {
    padding: 0 5px;
    margin-top: 10px;
    overflow-x: hidden;
    width: calc(100% - 10px);

    /* Ensure content doesn't overflow */
    * {
      max-width: 100%;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    /* Reduce font size for better mobile display */
    font-size: 0.85rem;

    p,
    h3,
    div {
      max-width: 100%;
    }

    /* Prevent text overflow */
    .range,
    .authors,
    .venue {
      max-width: 100%;
      text-overflow: ellipsis;
    }
  }
`

export default StyledTabPanels
