import { useState } from 'react';
import { Box, Button, Input, VStack, Heading, Text, Field } from '@chakra-ui/react';
import { PasswordInput, PasswordStrengthMeter } from './ui/password-input';
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
        <Field.Root invalid={isUsernameInvalid}>
          <Field.Label color={'black'}>Username</Field.Label>
          <Input
            placeholder='my_username'
            onChange={(e) => setUsername(e.target.value)}
            _focus={{ borderWidth: '2px' }}
            color={'Black'}
            borderColor={isUsernameInvalid ? 'red.500' : 'Black'}
            />
            <Field.ErrorText>{usernameError}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={isEmailInvalid}>
          <Field.Label color={'black'}>Email</Field.Label>
          <Input
            placeholder='me@example.com'
            onChange={(e) => setEmail(e.target.value)}
            _focus={{ borderWidth: '2px' }}
            color={'Black'}
            borderColor={isEmailInvalid ? 'red.500' : 'Black'}
            />
            <Field.ErrorText>{emailError}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={isPasswordInvalid}>
          <Field.Label color={'black'}>Password</Field.Label>
          <PasswordInput
            placeholder='mySecurePassword'
            onChange={(e) => setPassword(e.target.value)}
            _focus={{ borderWidth: '2px' }}
            color={'Black'}
            borderColor={isPasswordInvalid ? 'red.500' : 'Black'}
            />
            <Field.ErrorText>{passwordError}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={isPasswordInvalid}>
          <Field.Label color={'black'}>Repeat Password</Field.Label>
          <PasswordInput
            placeholder='Confirm: mySecurePassword'
            onChange={(e) => setRepeatPassword(e.target.value)}
            _focus={{ borderWidth: '2px' }}
            color={'Black'}
            borderColor={isPasswordInvalid ? 'red.500' : 'Black'}
            />
            <Field.ErrorText>{passwordError}</Field.ErrorText>
        </Field.Root>
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
