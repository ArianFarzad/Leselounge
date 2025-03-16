import {
  Drawer,
  Portal,
  Text,
  CloseButton,
  For,
  Image,
  Box,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IBook } from '@/types/types';

interface SearchBooksProps {
  bookTitle: string;
  children: React.ReactNode;
}

const SearchBooks: React.FC<SearchBooksProps> = ({ bookTitle, children }) => {
  const token = localStorage.getItem('token');
  const [books, setBooks] = useState<IBook[]>([]);

  const fetchBook = async (title: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/books/title/${title}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data && response.data.success && response.data.data) {
        const bookData = response.data.data;
        const booksArray = Array.isArray(bookData) ? bookData : [bookData];
        setBooks(booksArray);
      } else {
        console.error('Invalid API response:', response.data);
        setBooks([]);
      }
    } catch (error) {
      console.error('Error fetching book from API:', error);
      setBooks([]);
    }
  };

  useEffect(() => {
    if (bookTitle) {
      fetchBook(bookTitle);
    } else {
      setBooks([]);
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
              {books.length === 0 && <Text>No books found.</Text>}
              <For each={books}>
                {(book: IBook) => (
                  <Box
                    key={book._id}
                    gap={'2em'}
                    borderWidth="1px"
                    p="4"
                    display={'flex'}
                    flexDirection={'row'}
                  >
                    <Image
                      src={book.coverImageUrl || '/default-cover.jpg'}
                      alt={book.title}
                    />
                    <Flex direction={'column'}>
                      <Text fontWeight="bold" fontSize={'2em'}>
                        {book.title}
                      </Text>
                      <Text color="fg.muted" fontSize={'2em'}>
                        {book.author}
                      </Text>
                    </Flex>
                  </Box>
                )}
              </For>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default SearchBooks;
