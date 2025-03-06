import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import Register from '@/components/Register.tsx';
import WelcomeComponent from '@/components/welcomeComponent';

const RegisterPage: React.FC = () => {
  return (
    <Box
      background={`linear-gradient(to right, #ebdddd, #bdc2c9)`}
      minHeight="100vh"
      pt={10}
    >
      <HStack gap={0} justifyContent={'center'}>
        <WelcomeComponent />
        <Register />
      </HStack>
    </Box>
  );
};

export default RegisterPage;
