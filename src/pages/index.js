import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Layout, Experience, Contact } from "@components"

const StyledMainContainer = styled.main`
  counter-reset: section;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 0;

  @media (min-width: 480px) {
    gap: 40px;
    padding: 30px 0;
  }

  @media (min-width: 768px) {
    gap: 50px;
    padding: 40px 0;
  }
`

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Experience />
      <Contact />
    </StyledMainContainer>
  </Layout>
)

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default IndexPage
