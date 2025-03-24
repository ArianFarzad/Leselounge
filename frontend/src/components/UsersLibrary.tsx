import axios from 'axios';
import { IBook, ApiBookResponse } from '@/types/types';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Spinner,
  Image,
  Box,
  Flex,
  Text,
  Badge,
  Dialog,
  Portal,
  CloseButton,
  DataList,
  Separator,
} from '@chakra-ui/react';
import { Tooltip } from './ui/tooltip';
import { FiEdit, FiSave } from 'react-icons/fi';
import { status } from '@/constants/constants';
import CostumeRadioCard from './Radio'

interface UsersLibraryProps {
  userId: string | null;
}

const UsersLibrary: React.FC<UsersLibraryProps> = ({ userId }) => {
  const token = localStorage.getItem('token');
  const [books, setBooks] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const fetchBooks = useCallback(async () => {
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
  }, [token, userId]);

  useEffect(() => {
    if (userId && token) {
      fetchBooks();
    }
  }, [userId, token, fetchBooks]);

  const handleImageClick = (book: IBook) => {
    setSelectedBook(book);
  };

  const handleCloseDialog = () => {
    setSelectedBook(null);
    setIsEditing(false);
  };

  return (
    <>
      {isLoading ? (
        <Spinner size="xl" />
      ) : books.length > 0 ? (
        <Flex
          overflow="scroll"
          width={'100%'}
          gap="4"
          py="4"
          scrollbarWidth="none"
        >
          {books.map((book: IBook) => (
            <Box
              key={book._id}
              position="relative"
              cursor="pointer"
              width="200px"
              height="300px"
              _hover={{ transform: 'translateY(10px)' }}
            >
              <Tooltip content={book.title}>
                <Image
                  objectFit="cover"
                  width="100%"
                  height="100%"
                  src={book.coverImageUrl}
                  alt={book.title}
                  borderRadius="md"
                  onClick={() => handleImageClick(book)}
                />
              </Tooltip>
            </Box>
          ))}
        </Flex>
      ) : (
        <Text>No books found.</Text>
      )}

      {selectedBook && (
        <Dialog.Root open={!!selectedBook}>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Dialog.Title>{selectedBook.title}</Dialog.Title>
                    <Flex direction={'row'} gap="2" alignItems={'center'}>
                      {isEditing ? (
                        <Tooltip content="Save Changes">
                          <Box
                            key={selectedBook._id}
                            cursor="pointer"
                            onClick={() => setIsEditing(false)}
                          >
                            <FiSave size={20} />
                          </Box>
                        </Tooltip>
                      ) : (
                        <Tooltip content="Edit Book">
                          <Box
                            key={selectedBook._id}
                            cursor="pointer"
                            onClick={() => setIsEditing(true)}
                          >
                            <FiEdit size={20} />
                          </Box>
                        </Tooltip>
                      )}
                      <Dialog.CloseTrigger asChild>
                        <CloseButton onClick={handleCloseDialog} size="sm" />
                      </Dialog.CloseTrigger>
                    </Flex>
                  </Flex>
                </Dialog.Header>
                <Dialog.Body pb="8">
                  <DataList.Root orientation="horizontal">
                    <DataList.Item>
                      <DataList.ItemLabel>Author</DataList.ItemLabel>
                      <DataList.ItemValue>
                        {selectedBook.author}
                      </DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.ItemLabel>Status</DataList.ItemLabel>
                      <DataList.ItemValue>
                        <Badge colorPalette="green">
                          {selectedBook.status}
                        </Badge>
                      </DataList.ItemValue>
                    </DataList.Item>
                  </DataList.Root>
                  {isEditing && (
                    <Box mt="4">
                      <Separator mb="4" />
                      <CostumeRadioCard items={status} label='Change Status' />
                    </Box>
                  )}
                </Dialog.Body>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      )}
    </>
  );
};

export default UsersLibrary;
