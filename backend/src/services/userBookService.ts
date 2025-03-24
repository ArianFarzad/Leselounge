import UserBook from '../models/UserBook';
import { getOrFetchBook } from './bookService';

export const getUsersBooks = async (userId: string) => {
  return await UserBook.find({ userId }).populate('bookId').exec();
}

export const addBookToUser = async (
  userId: string,
  bookId: string,
  status: 'reading' | 'read' | 'onHold',
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

export const removeBookFromUser = async (userId: string, bookId: string) => {
  const userBook = await UserBook.findOneAndDelete({ userId, bookId });

  if (!userBook) {
    throw new Error('User book not found');
  }

  return userBook;
}

export const updateBookStatus = async (
  userId: string,
  bookId: string,
  status: 'reading' | 'read' | 'onHold',
) => {
  const userBook = await UserBook.findOne({ userId, bookId });

  if (userBook) {
    userBook.status = status;
    await userBook.save();
  }
  if (!userBook) {
    throw new Error('User book not found');
  }
  return userBook;
}
