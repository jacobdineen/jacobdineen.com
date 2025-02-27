import styled from "styled-components"

const StyledJobsSection = styled.section`
  max-width: 800px;
  font-size: var(--fz-lg);
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "radial-gradient(circle, rgba(100, 255, 218, 0.05) 0%, rgba(255,255,255,0) 70%)"
        : "radial-gradient(circle, rgba(100, 255, 218, 0.03) 0%, rgba(10,25,47,0) 70%)"};
    z-index: -1;
    pointer-events: none;
  }

  .inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  }

  ul.fancy-list {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 10px;
      font-size: var(--fz-sm);

      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: var(--green);
      }
    }
  }

  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    font-size: var(--fz-md);

    .button-group {
      justify-content: center;
    }
  }

  @media (max-width: 600px) {
    margin-left: 0;
    padding: 0 10px;
    font-size: var(--fz-sm);
  }
`

export default StyledJobsSection
