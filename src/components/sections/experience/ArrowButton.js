import styled from "styled-components"

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: var(--green);
  font-size: 2rem;
  padding: 0.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  position: relative;
  z-index: 1;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(100, 255, 218, 0.1)"
        : "rgba(100, 255, 218, 0.05)"};
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.3s ease;
    z-index: -1;
  }

  &:hover,
  &:focus {
    color: ${({ theme }) =>
      theme.mode === "light" ? "var(--green-dark)" : "var(--lightest-slate)"};
    transform: translateY(-2px);

    &:before {
      transform: scale(1);
    }
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    color: var(--light-slate);
    cursor: not-allowed;
    transform: none;

    &:before {
      transform: scale(0);
    }
  }

  @media (max-width: 600px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
  }
`

export default ArrowButton
