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
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    font-weight: 600;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    margin: 0 0 20px 0;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: var(--fz-xxl);
    font-weight: 600;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    margin: 0 0 20px 0;
    line-height: 1.2;
    position: relative;

    &:after {
      content: "";
      display: block;
      width: 40px;
      height: 3px;
      background-color: #0071e3;
      margin-top: 10px;
      border-radius: 2px;
    }
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;
    list-style-position: outside;
  }

  li {
    font-size: 0.95rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    margin: 0.6rem 0;
    padding: 0.25rem 0;
    overflow-wrap: break-word;
    word-break: break-word;
    line-height: 1.5;
  }

  p,
  div {
    color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};
  }

  a {
    color: #0071e3;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover,
    &:focus {
      color: #0077ed;
    }
  }

  .inner {
    width: 100%;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: var(--fz-xl);
    }

    li {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: var(--fz-lg);
    }

    li {
      font-size: 0.8rem;
    }
  }
`

export default StyledText
