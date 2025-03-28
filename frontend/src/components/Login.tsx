import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  Text,
  Field,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Toaster, toaster } from './ui/toaster';
import { PasswordInput } from './ui/password-input';
import { FiUserPlus } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
        },
      );

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', user._id);

      navigate('/homepage');

      toaster.create({ title: 'Login confirmed', type: 'success' });
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        toaster.create({ title: err.response.data?.message, type: 'error' });
      } else {
        toaster.create({ title: 'An unknown error occurred', type: 'error' });
      }
    }
  };

  const handleLoginToRegister = () => {
    navigate('/register');
  };

  return (
    <Box
      pt={3}
      pb={10}
      pl={10}
      pr={10}
      maxWidth="500px"
      border="1px solid"
      borderColor="rgba(255, 255, 255, 0.2)"
      height="84.5vh"
      bg="rgba(255, 255, 255, 0.5)"
      backdropFilter="blur(15px)"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
    >
      <Toaster />
      <VStack align="stretch">
        <Heading as="h1" size="3xl" textAlign="center" mb={6} color={'Black'}>
          Login to Your Account
        </Heading>
        <Field.Root>
          <Field.Label color={'black'}>Email</Field.Label>
          <Input
            placeholder="me@example.com"
            onChange={(e) => setEmail(e.target.value)}
            _focus={{ borderWidth: '2px' }}
            color={'Black'}
            borderColor={'Black'}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label color={'black'}>Password</Field.Label>
          <PasswordInput
            placeholder="mySecurePassword"
            onChange={(e) => setPassword(e.target.value)}
            _focus={{ borderWidth: '2px' }}
            color={'Black'}
            borderColor={'Black'}
          />
        </Field.Root>
        <Button
          colorScheme="teal"
          onClick={handleLogin}
          size="lg"
          mt={4}
          backgroundColor={'green.300'}
        >
          Access Account
        </Button>
        <Text
          textAlign="center"
          mt={4}
          color={'Black'}
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
        >
          Don’t have an account?{' '}
          <Text
            as="span"
            color="teal.500"
            cursor="pointer"
            display={'flex'}
            flexDirection={'row'}
            gap={'0.5em'}
            onClick={handleLoginToRegister}
          >
            <FiUserPlus /> Sign up here
          </Text>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
