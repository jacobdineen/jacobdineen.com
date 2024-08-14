import styled from "styled-components"

const PopupContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #112240;
  color: #64ffda;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  max-width: 300px;
  text-align: center;

  pre {
    white-space: pre-wrap;
    word-break: break-word;
    margin-bottom: 10px;
    font-size: 0.85rem;
    background-color: #0a192f;
    padding: 10px;
    border-radius: 5px;
  }
`

export default PopupContainer
