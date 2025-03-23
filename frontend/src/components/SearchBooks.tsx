import {
  Drawer,
  Portal,
  Text,
  CloseButton,
  For,
  Image,
  Box,
  Flex,
  Spinner,
  RadioCard,
  HStack,
  ActionBar,
  Checkbox,
  VStack,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { IBook } from '@/types/types';
import { FiPlus } from 'react-icons/fi';
import { Toaster, toaster } from './ui/toaster';

interface SearchBooksProps {
  bookTitle: string;
  children: React.ReactNode;
}

const SearchBooks: React.FC<SearchBooksProps> = ({ bookTitle, children }) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [books, setBooks] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('reading');
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  const status = [
    { value: 'reading', title: 'Reading' },
    { value: 'read', title: 'Read' },
    { value: 'onHold', title: 'Paused' },
  ];

  const fetchBook = useCallback(async (title: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/books/title/${title}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data?.success) {
        const bookData = response.data.data;
        setBooks(Array.isArray(bookData) ? bookData : [bookData]);
      } else setBooks([]);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (bookTitle) {
      fetchBook(bookTitle);
    } else {
      setBooks([]);
    }
  }, [bookTitle, fetchBook]);

  const handleBookSelection = (bookId: string) => {
    setSelectedBooks((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId],
    );
  };

  const handleAddToLibrary = async () => {
    try {
      console.log('selectedStatus:', selectedStatus);
      for (let i = 0; i < selectedBooks.length; i++) {
        await axios.post(
          'http://localhost:5000/api/users/books',
          {
            userId,
            bookId: selectedBooks[i],
            status: selectedStatus,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }
      setSelectedBooks([]);
      toaster.create({ title: 'Books added to library', type: 'success' });
    } catch (error) {
      console.error('Error adding books to library:', error);
      toaster.create({
        title: 'Failed to add books to library',
        type: 'error',
      });
    }
  };

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
              {isLoading ? (
                <Flex justify="center" align="center" height="100%">
                  <Spinner size="xl" />
                </Flex>
              ) : books.length === 0 ? (
                <Text>No books found.</Text>
              ) : (
                <For each={books}>
                  {(book: IBook) => (
                    <Box
                      key={book._id}
                      borderWidth="1px"
                      p="4"
                      mb="4"
                      position="relative"
                      minH="200px"
                    >
                      <Box
                        width="150px"
                        height="200px"
                        overflow="hidden"
                        borderRadius="md"
                      >
                        {isImageLoading && (
                          <Flex
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            justify="center"
                            align="center"
                            bg="rgba(255, 255, 255, 0.8)"
                          >
                            <Spinner size="xl" />
                          </Flex>
                        )}
                        <Image
                          src={book.coverImageUrl || '/default-cover.jpg'}
                          alt={book.title}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                          onLoad={() => setIsImageLoading(false)}
                          onError={() => setIsImageLoading(false)}
                        />
                      </Box>
                      <VStack
                        position="absolute"
                        top="4"
                        left="180px"
                        alignItems="flex-start"
                      >
                        <Text fontWeight="bold" fontSize="lg">
                          {book.title}
                        </Text>
                        <Text color="gray.500" fontSize="md">
                          {book.author}
                        </Text>
                      </VStack>
                      <Checkbox.Root
                        position="absolute"
                        bottom="4"
                        right="4"
                        onChange={() => handleBookSelection(book.bookId)}
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>Add to library</Checkbox.Label>
                      </Checkbox.Root>
                    </Box>
                  )}
                </For>
              )}
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
      <Toaster />
      <ActionBar.Root open={selectedBooks.length > 0}>
        <Portal>
          <ActionBar.Positioner
            bottom={20}
            float={'left'}
            position={'relative'}
            ml={'1em'}
          >
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                Add to your library
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <RadioCard.Root
                value={selectedStatus}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const value = event.currentTarget.value;
                  console.log('status value:', value);
                  setSelectedStatus(value);
                }}
              >
                <HStack>
                  {status.map((item) => (
                    <RadioCard.Item
                      key={item.value}
                      onClick={() => setSelectedStatus(item.value)}
                      value={item.value}
                    >
                      <RadioCard.ItemHiddenInput />
                      <RadioCard.ItemControl>
                        <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                        <RadioCard.ItemIndicator />
                      </RadioCard.ItemControl>
                    </RadioCard.Item>
                  ))}
                </HStack>
              </RadioCard.Root>
              <Button
                size="lg"
                colorScheme="teal"
                backgroundColor={'green.300'}
                onClick={handleAddToLibrary}
              >
                <FiPlus />
              </Button>
              <ActionBar.CloseTrigger asChild>
                <CloseButton size="sm" />
              </ActionBar.CloseTrigger>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </Drawer.Root>
  );
};

export default SearchBooks;