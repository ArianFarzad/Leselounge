import React from 'react';
import { Tabs } from '@chakra-ui/react';
import { FaHome, FaUser, FaCheckSquare } from 'react-icons/fa';

interface NavBarProps {
    homeContent: React.ReactNode;
    profileContent: React.ReactNode;
    tasksContent: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ homeContent, profileContent, tasksContent }) => {
    return (
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
    );
};

export default NavBar;
