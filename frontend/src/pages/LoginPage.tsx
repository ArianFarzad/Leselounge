import Login from '@/components/Login';
import WelcomeComponent from '@/components/welcomeComponent';
import { Box, HStack } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';

const LoginPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Leselounge - Sign in</title>
      </Helmet>
      <Box
        background={`linear-gradient(to right, #ebdddd, #bdc2c9)`}
        minHeight="100vh"
        pt={10}
      >
        <HStack gap={0} justifyContent={'center'}>
          <Login />
          <WelcomeComponent />
        </HStack>
      </Box>
    </>
  );
};

export default LoginPage;
