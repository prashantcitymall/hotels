import React from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/system';

const MainContainer = styled(Box)({
  backgroundColor: 'transparent',
  padding: '32px 0',
});

const MainContent = () => {
  return (
    <MainContainer>
      <Container maxWidth="xl">
        {/* Content will be added later */}
      </Container>
    </MainContainer>
  );
};

export default MainContent;
