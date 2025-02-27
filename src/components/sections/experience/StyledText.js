import styled from "styled-components"

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5rem;
  margin: 0;
  border-radius: 10px;
  background-color: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255, 255, 255, 0.5)"
      : "rgba(10, 25, 47, 0.3)"};
  backdrop-filter: blur(5px);
  box-shadow: 0 10px 30px -15px ${({ theme }) => (theme.mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(2, 12, 27, 0.5)")};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 15px 40px -15px ${({ theme }) => (theme.mode === "light" ? "rgba(0, 0, 0, 0.15)" : "rgba(2, 12, 27, 0.7)")};
    transform: translateY(-5px);
  }

  h1 {
    font-size: var(--fz-xxl);
    font-weight: 800;
    margin: 0 0 25px 0;
    line-height: 1.2;
    position: relative;

    &:after {
      content: "";
      display: block;
      width: 50px;
      height: 3px;
      background-color: var(--green);
      margin-top: 10px;
    }
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;
    list-style-position: outside;
  }

  li {
    font-size: 0.95rem;
    margin: 0.6rem 0;
    padding: 0.25rem 0;
    overflow-wrap: break-word;
    word-break: break-word;
    line-height: 1.5;

    &:before {
      color: var(--green);
      font-size: 1.05rem;
      line-height: 0.75rem;
      margin-right: 0.35rem;
    }
  }

  p {
    margin-bottom: 15px;
    line-height: 1.6;
    font-size: 0.95rem;
  }

  a {
    color: var(--green);
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover,
    &:focus {
      color: ${({ theme }) =>
        theme.mode === "light" ? "var(--green-dark)" : "var(--lightest-slate)"};
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    padding: 1.25rem;

    h1 {
      font-size: var(--fz-xl);
    }

    li {
      font-size: 0.85rem;
    }

    p {
      font-size: 0.85rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;

    h1 {
      font-size: var(--fz-lg);
    }

    li {
      font-size: 0.8rem;
    }

    p {
      font-size: 0.8rem;
    }
  }
`

export default StyledText
