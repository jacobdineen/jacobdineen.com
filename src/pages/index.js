import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Layout, Experience, Contact } from "@components"

const StyledMainContainer = styled.main`
  counter-reset: section;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 0;
  position: relative;

  @media (min-width: 768px) {
    gap: 64px;
  }

  @media (min-width: 1080px) {
    gap: 80px;
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
