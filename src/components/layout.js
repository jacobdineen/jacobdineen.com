import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Loader, Nav, Social, Email, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';
import About from '@components/sections/about';
import { Link } from 'gatsby';

const sections = ['research','projects', 'contact'];

const StyledContainer = styled.div`
  display: flex;
`;

const StyledSidebar = styled.aside`
  width: 40vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #020c1b; // Assuming this is the color you want
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  justify-content: center; // This will keep the nav centered vertically
  align-items: flex-start; // Change to flex-start to align items to the left
  z-index: 10;
  font-family: 'Font Name', sans-serif; // Replace 'Font Name' with your actual font

  nav {
    width: 100%; // Take the full width of the sidebar
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center; // Center align items for the nav

      li {
        width: 100%; // Ensure the full width for center alignment
        margin: 10px 0; // Adjust space between links

        a {
          color: white; // Text color for the links
          text-decoration: none; // No underline
          font-size: 1em; // Adjust the font size as necessary
          transition: color 0.3s ease; // Transition for the color change

          display: flex; // Use flexbox for horizontal layout
          justify-content: center; // Center text horizontally
          position: relative; // Needed for the absolute positioning of the pseudo-element

          // Horizontal line for each item
          &::after {
            content: '';
            position: absolute;
            bottom: -5px; // Adjust this value to move the line up or down
            left: 50%; // Start at the center
            transform: translateX(-50%); // Center the line horizontally
            width: 30px; // Default width of the line
            height: 2px; // Height of the line
            background: transparent; // Transparent line by default
            transition: all 0.3s ease; // Smooth transition for the line width
          }

          // When active, show the line
          &.active::after {
            background: white; // Line color for active link
            width: 60px; // Longer line for the active item
          }

          &:hover {
            color: #64ffda; // Color change on hover
            &::after {
              background: #64ffda; // Line color on hover
            }
          }
        }
      }
    }
  }
`;

const StyledMainContent = styled.main`
  width: 60vw;
  margin-left: 40vw;
  min-height: 100vh;
  overflow-y: scroll;
  position: relative;
  padding-top: 100px;
  padding-bottom: 100px;
`;

const Layout = ({ children, location }) => {
  const [isLoading, setIsLoading] = useState(location.pathname === '/');
  const [activeSection, setActiveSection] = useState('');


  return (
    <>
      <Head />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {isLoading ? (
          <Loader finishLoading={() => setIsLoading(false)} />
        ) : (
          <StyledContainer>
            <StyledSidebar>
              <About />
            <nav>
              <ul>
                {sections.map((section) => (
                  <li key={section}>
                    <a
                      href={`#${section}`}
                      className={activeSection === section ? 'active' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            </StyledSidebar>
            <StyledMainContent id="content">
              {children}
              <Footer />
            </StyledMainContent>
          </StyledContainer>
        )}
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
