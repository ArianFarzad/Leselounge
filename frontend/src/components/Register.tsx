import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  HStack,
} from '@chakra-ui/react';
import { FormLabel, FormControl } from '@chakra-ui/form-control';
import { Toaster, toaster } from "@/components/ui/toaster"
import { FiLogIn } from 'react-icons/fi';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleRegister = async (): Promise<void> => {
    if (password !== repeatPassword) {
      toaster.create({ title: 'Passwords do not match', type: 'error' });
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });

      toaster.create({ title: 'Account created', type: 'success' });
    } catch (error: any) {
      toaster.create({ title: error.response?.data?.error?.message || 'Registration failed', type: 'error' });
    }
  };

  return (
    <Box p={4} maxWidth="400px" mx="auto" mt={10}>
      <Toaster />
      <VStack align="stretch">
        <Heading as="h1" size="3xl" textAlign="center" mb={6}>
          Create an account
        </Heading>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
            size="lg"
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            size="lg"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            size="lg"
          />
        </FormControl>
        <FormControl id="repeatPassword">
          <FormLabel>Repeat password</FormLabel>
          <Input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Repeat your password"
            size="lg"
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleRegister} size="lg" mt={4}>
          Register
        </Button>
        <Text textAlign="center" mt={4}>
          <VStack align="center">
            Already have an account?{' '}
            <Text as="span" color="teal.500" cursor="pointer">
              <HStack>
                <FiLogIn /> Login
              </HStack>
            </Text>
          </VStack>
        </Text>
      </VStack>
    </Box>
  );
};

export default Register;