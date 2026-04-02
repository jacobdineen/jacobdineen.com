import styled from "styled-components"

const Button = styled.button`
  background: ${({ outlined }) => (outlined ? "transparent" : "#0071e3")};
  color: ${({ outlined }) => (outlined ? "#0071e3" : "#ffffff")};
  padding: 8px 16px;
  border-radius: 6px;
  border: ${({ outlined }) =>
    outlined ? "1px solid #0071e3" : "1px solid #0071e3"};
  cursor: pointer;
  margin: 4px;
  font-size: 0.82rem;
  font-weight: 500;
  font-family: var(--font-sans);
  transition: all 0.15s ease;

  &:hover {
    background: ${({ outlined }) =>
      outlined ? "rgba(0, 113, 227, 0.08)" : "#0077ed"};
  }

  &:focus-visible {
    outline: 2px solid #0071e3;
    outline-offset: 2px;
  }

  &.small {
    padding: 5px 10px;
    font-size: 0.75rem;
  }

  &.large {
    padding: 10px 20px;
    font-size: 0.95rem;
  }
`

export default Button
