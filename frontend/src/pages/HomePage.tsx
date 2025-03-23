import { Box, Flex } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import NavBar from '@/components/NavBar';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { IUser } from '@/types/types';
import UsersLibrary from '@/components/UsersLibrary';
import DisplayBooks from '@/components/DisplayBooks';

const HomePage: React.FC = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [user, setUser] = useState<IUser>({ _id: '', email: '', username: '' });

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
        },
      });
      setUser(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }, [userId, token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
        >
          <NavBar
            homeContent={<DisplayBooks />}
            profileContent={<div>Profile</div>}
            tasksContent={<div>Settings</div>}
            user={user}
          />
        </Flex>
      </Box>
    </>
  );
};

export default HomePage;