import UserBook from '../models/UserBook';
import { getOrFetchBook } from './bookService';

export const getUsersBooks = async (userId: string) => {
  return await UserBook.find({ userId }).populate('bookId').exec();
}

export const addBookToUser = async (
  userId: string,
  bookId: string,
  status: string,
) => {
  const book = await getOrFetchBook(bookId);

  if (!book) {
    throw new Error('Book not found');
  }

  const userBook = new UserBook({
    userId,
    bookId: book._id,
    status,
  });

  await userBook.save();
  return userBook;
};