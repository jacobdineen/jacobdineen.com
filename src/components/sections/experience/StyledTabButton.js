import styled from "styled-components"

const StyledTabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  font-size: var(--fz-sm);
  font-weight: 500;
  min-height: 36px;
  height: auto;
  width: 100%;
  max-width: 100%;
  border: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#3d3d3d")};
  border-radius: 980px;
  background-color: ${({ theme }) =>
    theme.mode === "light" ? "#ffffff" : "#1d1d1f"};
  text-align: center;
  padding: 10px 20px;
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;
  position: relative;
  white-space: normal;
  word-wrap: break-word;
  line-height: 1.4;
  margin: 2px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  &:hover,
  &:focus {
    border-color: #0071e3;
    color: #0071e3;
  }

  ${({ isActive }) =>
    isActive &&
    `
    background-color: #0071e3;
    border-color: #0071e3;
    color: #ffffff;
    font-weight: 600;
    
    &:hover,
    &:focus {
      background-color: #0077ed;
      border-color: #0077ed;
      color: #ffffff;
    }
  `}

  @media (max-width: 768px) {
    font-size: var(--fz-xs);
    min-height: 34px;
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    min-height: 32px;
    padding: 6px 12px;
    font-size: 11px;
  }
`

export default StyledTabButton
