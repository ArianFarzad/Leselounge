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
  import React, { useEffect, useState } from 'react';
  import { IBook } from '@/types/types';
  import { FiPlus } from 'react-icons/fi';
  
  
  interface SearchBooksProps {
    bookTitle: string;
    children: React.ReactNode;
  }
  
  const SearchBooks: React.FC<SearchBooksProps> = ({ bookTitle, children }) => {
    const token = localStorage.getItem('token');
    const [books, setBooks] = useState<IBook[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('reading');
  
    const status = [
      { value: 'reading', title: 'Reading' },
      { value: 'read', title: 'Read' },
      { value: 'onHold', title: 'Paused' },
    ];
  
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
  
    // Handler für die Auswahl der Bücher
    const handleBookSelection = (bookId: string) => {
      if (selectedBooks.includes(bookId)) {
        setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
      } else {
        setSelectedBooks([...selectedBooks, bookId]);
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
                          alignItems="center"
                        >
                          <Checkbox.Root
                            checked={selectedBooks.includes(book._id)}
                            onCheckedChange={() => handleBookSelection(book._id)}
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                          </Checkbox.Root>
                          <Box
                            position="relative"
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
                                zIndex="1"
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
                          <VStack align="start" ml="4">
                            <Text fontWeight="bold" fontSize={'1.2em'}>
                              {book.title}
                            </Text>
                            <Text color="fg.muted" fontSize={'1.2em'}>
                              {book.author}
                            </Text>
                          </VStack>
                        </Box>
                      );
                    }}
                  </For>
                )}
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
  
        <ActionBar.Root open={selectedBooks.length > 0}>
          <Portal>
            <ActionBar.Positioner>
              <ActionBar.Content>
                <RadioCard.Root
                  value={selectedStatus}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.currentTarget.value;
                    setSelectedStatus(value);
                  }}
                >
                  <HStack>
                    {status.map((item) => (
                      <RadioCard.Item key={item.value} value={item.value}>
                        <RadioCard.ItemHiddenInput />
                        <RadioCard.ItemControl>
                          <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                          <RadioCard.ItemIndicator />
                        </RadioCard.ItemControl>
                      </RadioCard.Item>
                    ))}
                  </HStack>
                </RadioCard.Root>
                <Button size="lg" backgroundColor={'green.300'} colorScheme={'teal'}>
                    <FiPlus />
                </Button>
              </ActionBar.Content>
            </ActionBar.Positioner>
          </Portal>
        </ActionBar.Root>
      </Drawer.Root>
    );
  };
  
  export default SearchBooks;