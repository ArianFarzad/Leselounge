import axios from 'axios';
import { IBook, ApiBookResponse } from '@/types/types';
import React, { useEffect } from 'react';
import { Spinner, For, Image, Card, Box, Wrap, Text } from '@chakra-ui/react';

interface UsersLibraryProps {
  userId: string | null;
}

const UsersLibrary: React.FC<UsersLibraryProps> = ({ userId }) => {
  const token = localStorage.getItem('token');
  const [books, setBooks] = React.useState<IBook[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${userId}/books`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      console.log('API Response:', response.data);

      if (response.data?.success) {
        const bookData = response.data.data;
        console.log('Raw book data:', bookData);

        const transformedData = bookData.map((item: ApiBookResponse) => ({
          ...item.bookId,
          status: item.status,
          userBookId: item._id,
        }));

        console.log('Transformed data:', transformedData);
        setBooks(transformedData);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchBooks();
    }
  }, [userId, token]);

  return (
    <>
      {isLoading ? (
        <Spinner size="xl" />
      ) : books.length > 0 ? (
        <Wrap gap="4">
          <For each={books}>
            {(book: IBook) => (
              <Card.Root
                key={book._id}
                flexDirection="row"
                overflow="hidden"
                width={'xl'}
                pr={2}
                borderWidth="1px"
                borderRadius="md"
              >
                <Image
                  src={book.coverImageUrl}
                  alt={book.title}
                  objectFit="cover"
                  borderRadius="md"
                />
                <Box ml="4">
                  <Card.Title fontSize="lg" fontWeight="bold">
                    {book.title}
                  </Card.Title>
                  <Card.Description color="gray.500" fontSize="md">
                    {book.author}
                  </Card.Description>
                </Box>
              </Card.Root>
            )}
          </For>
        </Wrap>
      ) : (
        <Text>No books found.</Text>
      )}
    </>
  );
};

export default UsersLibrary;
