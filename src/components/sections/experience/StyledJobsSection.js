import styled from "styled-components"

const StyledJobsSection = styled.section`
  max-width: 100%;
  font-size: var(--fz-lg);
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0 auto 40px;

  .inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    width: 100%;
  }

  ul.fancy-list {
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;

    li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 10px;
      font-size: var(--fz-sm);
      max-width: 100%;
      color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};

      &:before {
        content: "•";
        position: absolute;
        left: 0;
        color: #0071e3;
        font-weight: 600;
      }
    }
  }

  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: var(--fz-md);
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    margin-bottom: 30px;

    .button-group {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    margin-left: 0;
    padding: 0;
    font-size: var(--fz-sm);
    width: 100%;

    * {
      max-width: 100%;
      box-sizing: border-box;
    }
  }
`

export default StyledJobsSection
