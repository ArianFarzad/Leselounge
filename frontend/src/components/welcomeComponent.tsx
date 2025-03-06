import React from 'react';
import { Box } from '@chakra-ui/react';

const WelcomeComponent: React.FC = () => {
  return (
    <Box
      backgroundImage={'url(../../public/books.jpg)'}
      backgroundSize={'cover'}
      width="50%"
      height="84.5vh"
    ></Box>
  );
};

export default WelcomeComponent;
