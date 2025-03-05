import { useState } from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';
import { FormLabel, FormControl } from '@chakra-ui/form-control';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Registration logic here
    console.log('Registering:', { username, password });
  };

  return (
    <Box p={4} maxWidth="400px" mx="auto">
      <VStack>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" onClick={handleRegister}>
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default Register;