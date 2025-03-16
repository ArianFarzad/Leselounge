import {
    Drawer,
    Portal,
    Text,
    CloseButton,
    For,
    Image,
    Box,
    Flex,
    Spinner
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    const fetchBook = async (title: string) => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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
                {isLoading ? (
                  <Flex justify="center" align="center" height="100%">
                    <Spinner size="xl" />
                  </Flex>
                ) : books.length === 0 ? (
                  <Text>No books found.</Text>
                ) : (
                  <For each={books}>
                    {(book: IBook) => {
                      const [isImageLoading, setIsImageLoading] = useState(true);
  
                      return (
                        <Box
                          key={book._id}
                          gap={'2em'}
                          borderWidth="1px"
                          p="4"
                          display={'flex'}
                          flexDirection={'row'}
                        >
                          <Box position="relative" boxSize="150px">
                            {isImageLoading && (
                              <Flex
                                position="absolute"
                                justify="center"
                                align="center"
                                boxSize="100%"
                              >
                                <Spinner size="xl" />
                              </Flex>
                            )}
                            <Image
                              src={book.coverImageUrl || '/default-cover.jpg'}
                              alt={book.title}
                              objectFit="cover"
                              onLoad={() => setIsImageLoading(false)}
                              onError={() => setIsImageLoading(false)}
                            />
                          </Box>
                          <Flex direction={'column'}>
                            <Text fontWeight="bold" fontSize={'1.2em'}>
                              {book.title}
                            </Text>
                            <Text color="fg.muted" fontSize={'1.2em'}>
                              {book.author}
                            </Text>
                          </Flex>
                        </Box>
                      );
                    }}
                  </For>
                )}
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    );
  };
  
  export default SearchBooks;