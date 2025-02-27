import styled from "styled-components"

const TechTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  
  /* Add staggered animation for child elements */
  & > a {
    opacity: 0;
    animation: fadeInUp 0.4s forwards;
    animation-delay: calc(0.05s * var(--index, 0));
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export default TechTagsContainer
