import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Avatar,
  Text,
  Tabs,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { InputGroup } from './ui/input-group';
import { FaHome, FaUser, FaCheckSquare } from 'react-icons/fa';
import { FiLogOut, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toaster } from './ui/toaster';
import { IUser } from '@/types/types';
import SearchBooks from './SearchBooks';

interface NavBarProps {
  homeContent: React.ReactNode;
  profileContent: React.ReactNode;
  tasksContent: React.ReactNode;
  user: IUser;
}

const NavBar: React.FC<NavBarProps> = ({
  homeContent,
  profileContent,
  tasksContent,
  user,
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
    try {
      axios.get('http://localhost:5000/api/auth/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toaster.create({ title: err.response.data?.message, type: 'error' });
      }
    }
  };

  return (
    <Box width={'1000px'}>
      <Toaster />
      <Tabs.Root defaultValue="home" variant="enclosed" colorScheme="gray">
        <Tabs.List display={'flex'} justifyContent={'space-between'}>
          <Flex direction={'row'}>
            <Tabs.Trigger value="home">
              <FaHome />
              Home
            </Tabs.Trigger>
            <Tabs.Trigger value="profile">
              <FaUser />
              Profile
            </Tabs.Trigger>
            <Tabs.Trigger value="tasks">
              <FaCheckSquare />
              Settings
            </Tabs.Trigger>
          </Flex>
          <HStack gap={2}>
            <InputGroup
              endElement={
                <SearchBooks bookTitle={searchQuery}>
                  <Button
                    size={'xs'}
                    colorScheme="teal"
                    backgroundColor={'green.300'}
                    onClick={() => setSearchQuery(searchValue)}
                  >
                    <FiSearch />
                  </Button>
                </SearchBooks>
              }
            >
              <Input
                placeholder="Search for books"
                color={'black'}
                borderColor={'black'}
                _focus={{ borderWidth: '2px' }}
                backgroundColor={'white'}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </InputGroup>
            <Avatar.Root>
              <Avatar.Fallback name={user.username} />
            </Avatar.Root>
            <Text color={'white'}>{user.username}</Text>
            <Button
              colorScheme="teal"
              size="sm"
              backgroundColor={'green.300'}
              onClick={handleLogout}
            >
              <FiLogOut />
            </Button>
          </HStack>
        </Tabs.List>
        <Tabs.Content value="home">{homeContent}</Tabs.Content>
        <Tabs.Content value="profile">{profileContent}</Tabs.Content>
        <Tabs.Content value="tasks">{tasksContent}</Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default NavBar;
