import React, { useState } from 'react';
import { Flex, Input, Button, Avatar, Text, Tabs } from '@chakra-ui/react';
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
    <Flex direction="row" justify={'space-between'} width={'100%'}>
      <Toaster />
      <Tabs.Root defaultValue="home" variant="enclosed" colorScheme="gray">
        <Tabs.List>
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
        </Tabs.List>
        <Tabs.Content value="home">{homeContent}</Tabs.Content>
        <Tabs.Content value="profile">{profileContent}</Tabs.Content>
        <Tabs.Content value="tasks">{tasksContent}</Tabs.Content>
      </Tabs.Root>
      <Flex
        direction={'row'}
        gap={'2em'}
        backgroundColor={'gray.900'}
        padding={'0.5em'}
        height={'60%'}
        alignItems={'center'}
        borderRadius={'0.5em'}
      >
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
      </Flex>
    </Flex>
  );
};

export default NavBar;
