import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Layout, Experience, News, Contact } from "@components"

const StyledMainContainer = styled.main`
  counter-reset: section;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 32px; /* tighter section spacing */
  padding: 0;
  position: relative;

  @media (min-width: 768px) {
    gap: 48px;
  }

  @media (min-width: 1080px) {
    gap: 56px;
  }
`

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Experience />
      <News />
      <Contact />
    </StyledMainContainer>
  </Layout>
)

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default IndexPage
