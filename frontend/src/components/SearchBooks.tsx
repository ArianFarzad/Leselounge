import { Drawer, Portal, Text, CloseButton, Flex } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';

interface SearchBooksProps {
  bookTitle: string;
  children: React.ReactNode;
}

const SearchBooks: React.FC<SearchBooksProps> = ({ bookTitle, children }) => {
  const token = localStorage.getItem('token');

  const fetchBook = async (title: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/title/${title}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching book from API:', error);
    }
  };

  useEffect(() => {
    if (bookTitle) {
      fetchBook(bookTitle);
    }
  }, [bookTitle]);

  return (
    <Drawer.Root size={'lg'}>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header display={'flex'} justifyContent={'space-between'}>
              <Drawer.Title>Search Books</Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body>
              <Text>Search results for: {bookTitle}</Text>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default SearchBooks;