import styled from "styled-components"

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  margin: 0;

  h1 {
    font-size: var(--fz-md);
    font-weight: 1000;
    margin: 0 0 20px 0;
    line-height: 1.2;
  }

  ul {
    padding-left: 1.5rem;
    margin: 0;
    list-style-position: outside;
  }

  li {
    font-size: 0.875rem;
    margin: 0.5rem 0;
    padding: 0.25rem 0;
    overflow-wrap: break-word;
    word-break: break-word;
    line-height: 1.4;

    &:before {
      color: var(--green);
      font-size: 1.05rem;
      line-height: 0.75rem;
      margin-right: 0.35rem;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    h1 {
      font-size: 0.875rem;
    }

    li {
      font-size: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;

    h1 {
      font-size: 0.75rem;
    }

    li {
      font-size: 0.75rem;
    }
  }
`

export default StyledText
