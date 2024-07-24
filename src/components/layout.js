import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Loader, Footer } from '@components';
import theme from '@styles/theme';
import GlobalStyle from '@styles/GlobalStyle';
import About from '@components/sections/about';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const sections = ['experience', 'contact', 'resume'];

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const StyledSidebar = styled.aside`
  width: 30%;
  height: 100vh;
  position: fixed;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;

  @media (max-width: 1080px) {
    width: 40%;
  }

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 600px) {
    position: relative;
    width: 100%;
    height: auto;
    padding-right: 210px;
  }

  nav {
    width: 100%;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      li {
        margin: 8px 0;

        a {
          color: #89cfef;
          text-decoration: none;
          font-size: 1em;
          transition: color 0.3s ease;
          display: flex;
          justify-content: center;
          position: relative;

          &::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 2px;
            background: transparent;
            transition: all 0.3s ease;
          }

          &.active::after {
            background: white;
            width: 60px;
          }

          &:hover {
            color: #64ffda;
            &::after {
              background: #64ffda;
            }
          }
        }
      }
    }
  }
`;

const StyledMainContent = styled.main`
  width: 80%;
  margin-left: 30%;
  position: relative;
  padding-bottom: 0px;
  display: flex;
  z-index: 10;
  padding-top: 80px;

  @media (max-width: 1080px) {
    width: 60%;
    margin-left: 40%;
  }

  @media (max-width: 768px) {
    width: 40%;
    padding-top: 0px;
    margin-left: 50%;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-left: 0;
  }
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: 0 10px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #4cd137;
  }

  &:checked + span:before {
    transform: translateX(16px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const ToggleSwitch = ({ label, onChange }) => {
  const [checked, setChecked] = useState(true); // Default to dark mode

  const handleChange = () => {
    setChecked(!checked);
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <ToggleWrapper>
      <span>{label}</span>
      <ToggleLabel>
        <ToggleInput type="checkbox" checked={checked} onChange={handleChange} />
        <Slider />
      </ToggleLabel>
    </ToggleWrapper>
  );
};

const Layout = ({ children, location }) => {
  const [isLoading, setIsLoading] = useState(location.pathname === '/');
  const [activeSection, setActiveSection] = useState('');
  const [themeMode, setThemeMode] = useState('dark'); // Default to dark mode

  const handleSectionClick = (e, section) => {
    e.preventDefault();
    if (section === 'resume') {
      window.location.href = '/Academic_Resume2.pdf';
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section);
    }
  };

  const toggleTheme = (checked) => {
    setThemeMode(checked ? 'dark' : 'light');
  };

  return (
    <>
      <Head />
      <ThemeProvider theme={{ ...theme, mode: themeMode }}>
        <GlobalStyle />
        <Analytics />
        <SpeedInsights />
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
                        onClick={(e) => handleSectionClick(e, section)}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <ToggleSwitch label="Dark Mode" onChange={toggleTheme} />
            </StyledSidebar>
            <StyledMainContent id="content">{children}</StyledMainContent>
          </StyledContainer>
        )}
        <Footer />
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
