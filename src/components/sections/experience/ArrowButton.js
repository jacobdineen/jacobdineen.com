import styled from "styled-components"

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: var(--green);
  font-size: 2rem;
  padding: 0 10px;
  transition: color 0.3s;

  &:hover,
  &:focus {
    color: var(--lightest-slate);
  }

  &:disabled {
    color: var(--light-slate);
  }

  @media (max-width: 600px) {
    display: none;
  }
`

export default ArrowButton
