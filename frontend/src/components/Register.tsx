import { useState } from 'react';
import { Box, Button, Input, VStack, Heading, Text } from '@chakra-ui/react';
import {
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/form-control';
import { Toaster, toaster } from '@/components/ui/toaster';
import { FiLogIn } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isUsernameInvalid = usernameError !== '';
  const isEmailInvalid = emailError !== '';
  const isPasswordInvalid = passwordError !== '';

  const handleRegister = async (): Promise<void> => {
    setUsernameError('');
    setEmailError('');
    setPasswordError('');

    if (password !== repeatPassword) {
      toaster.create({ title: 'Passwords do not match', type: 'error' });
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          username,
          email,
          password,
        },
      );

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', user._id);

      navigate('/login');

      toaster.create({ title: 'Account created', type: 'success' });
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        const emailError = err.response.data?.error?.errors?.email?.message;
        const usernameError =
          err.response.data?.error?.errors?.username?.message;
        const passwordError =
          err.response.data?.error?.errors?.password?.message;
        if (emailError) {
          setEmailError(emailError);
        } else if (usernameError) {
          setUsernameError(usernameError);
        } else if (passwordError) {
          setPasswordError(passwordError);
        }
      } else {
        toaster.create({ title: 'Registration failed', type: 'error' });
      }
    }
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
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
          Start your journey with us
        </Heading>
        <FormControl id="username" isInvalid={isUsernameInvalid}>
          <FormLabel color={'Black'}>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
            size="lg"
            borderColor={isUsernameInvalid ? 'red.500' : 'Black'}
            transition="border-color 0.3s ease-in-out"
            color={'Black'}
            _focus={{ borderColor: 'green.700' }}
          />
          {isUsernameInvalid && (
            <FormErrorMessage textColor={'red'}>
              {usernameError}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="email" isInvalid={isEmailInvalid}>
          <FormLabel color={'Black'}>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            size="lg"
            borderColor={isEmailInvalid ? 'red.500' : 'Black'}
            transition="border-color 0.3s ease-in-out"
            color={'Black'}
            _focus={{ borderColor: 'green.700' }}
          />
          {isEmailInvalid && (
            <FormErrorMessage textColor={'red'}>{emailError}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="password" isInvalid={isPasswordInvalid}>
          <FormLabel color={'Black'}>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            size="lg"
            borderColor={isPasswordInvalid ? 'red.500' : 'Black'}
            transition="border-color 0.3s ease-in-out"
            color={'Black'}
            _focus={{ borderColor: 'green.700' }}
          />
          {isPasswordInvalid && (
            <FormErrorMessage textColor={'red'}>
              {passwordError}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="repeatPassword">
          <FormLabel color={'Black'}>Confirm password</FormLabel>
          <Input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Confirm your password"
            size="lg"
            borderColor="Black"
            color={'Black'}
            _focus={{ borderColor: 'green.700' }}
          />
        </FormControl>
        <Button
          colorScheme="teal"
          onClick={handleRegister}
          size="lg"
          mt={4}
          backgroundColor={'green.300'}
        >
          Create Account
        </Button>
        <Text
          textAlign="center"
          mt={4}
          color={'Black'}
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          onClick={handleNavigateToLogin}
        >
          Already have an account?{' '}
          <Text
            as="span"
            color="teal.500"
            cursor="pointer"
            display={'flex'}
            flexDirection={'row'}
            gap={'0.5em'}
          >
            <FiLogIn /> Sign in here
          </Text>
        </Text>
      </VStack>
    </Box>
  );
};

export default Register;
