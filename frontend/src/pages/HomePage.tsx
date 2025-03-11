import { Box, Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Leselounge - Home</title>
      </Helmet>
      <Box
        background={`linear-gradient(135deg, #f8f9fa, #e9ecef)`}
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontFamily="system-ui, sans-serif"
      >
        <Flex
          direction="row"
          justify="space-betwenn"
          position="fixed"
          top={3}
          pl={3}
          pr={3}
          width="100%"
        >
          <NavBar
            homeContent={<div>Home</div>}
            profileContent={<div>Profile</div>}
            tasksContent={<div>Settings</div>}
          />
        </Flex>
      </Box>
    </>
  );
};

export default HomePage;
