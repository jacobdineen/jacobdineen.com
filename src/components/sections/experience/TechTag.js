import styled from "styled-components"

const TechTag = styled.a`
  display: inline-flex;
  align-items: center;
  margin: 1px;
  padding: 1px 10px;
  font-size: 0.75em;
  background-color: #112240;
  color: #64ffda;
  border-radius: 2px;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  &:hover,
  &:focus {
    background-color: #0a192f;
    color: #fff;
  }
`

export default TechTag
