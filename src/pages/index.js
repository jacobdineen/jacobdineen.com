import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Layout, Experience, Contact } from "@components"
import About from "@components/sections/about"

const StyledMainContainer = styled.main`
  counter-reset: section;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 50px 0;
`

const MobileAboutSection = styled.div`
  display: block;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    display: none;
  }
`

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <MobileAboutSection>
        <About />
      </MobileAboutSection>
      <Experience />
      <Contact />
    </StyledMainContainer>
  </Layout>
)

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default IndexPage
