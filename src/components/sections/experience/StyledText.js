import styled from "styled-components"

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0;
  margin: 0;
  width: 100%;

  h3 {
    font-size: clamp(1.15rem, 3vw, 1.4rem);
    font-weight: 600;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    margin: 0 0 12px 0;
    line-height: 1.3;
    letter-spacing: -0.025em;
  }

  h1 {
    font-size: clamp(0.95rem, 2vw, 1.1rem);
    font-weight: 600;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    margin: 0 0 20px 0;
    line-height: 1.3;
    letter-spacing: -0.02em;
  }

  p,
  div {
    color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};
    font-size: 0.88rem;
    line-height: 1.7;
  }

  a {
    color: #0071e3;
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover,
    &:focus {
      color: #0077ed;
    }

    &:after {
      display: none;
    }
  }

  .inner {
    width: 100%;
  }
`

export default StyledText
