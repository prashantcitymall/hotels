import React from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchForm from '../components/SearchForm/SearchForm';

const HeroSection = styled(Box)`
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.4)
    );
  }
`;

const ContentWrapper = styled(Container)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding-top: 80px; // Account for fixed header
`;

const Home = () => {
  return (
    <HeroSection>
      <ContentWrapper maxWidth="lg">
        <SearchForm />
      </ContentWrapper>
    </HeroSection>
  );
};

export default Home;
