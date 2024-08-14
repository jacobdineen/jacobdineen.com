import styled from "styled-components"

const StyledTabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--green);
  font-size: var(--fz-xxs);
  width: auto;
  height: var(--tab-height);
  border: none;
  border-radius: 20px; /* Rounded corners */
  background-color: transparent;
  text-align: center;
  box-sizing: border-box;
  padding: 0 20px;
  transition: all 0.3s ease; /* Smooth transition for all properties */
  cursor: pointer; /* Change cursor to pointer for better UX */
  outline: none; /* Remove default button outline */

  @media (max-width: 600px) {
    width: 100%;
    padding: 10px 0;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
    color: var(--green); /* Ensure text color contrasts with hover background */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow on hover */
    transform: translateY(-2px); /* Slight lift effect on hover */
  }

  ${({ isActive }) =>
    isActive &&
    `
    background-color: var(--navy);
    color: var(--green);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    transform: scale(1.05); /* Slightly smaller scale for better look */
    z-index: 1;
    border-bottom: 3px solid var(--green);
  `}
`

export default StyledTabButton
