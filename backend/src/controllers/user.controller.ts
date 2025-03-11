import { Request, Response } from 'express';
import { addBookToUser } from '../services/bookService';
import UserBook from '../models/UserBook';
import { getUserById } from '../services/userService';

export const addBookToUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId, bookId, status } = req.body;

  try {
    const userBook = await addBookToUser(userId, bookId, status);
    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: userBook,
    });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add book',
    });
  }
};

export const getUserBooksController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req.params;

  try {
    const userBooks = await UserBook.find({ userId }).populate('bookId').exec();

    res.status(200).json({
      success: true,
      message: 'Books fetched successfully',
      data: userBooks,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch books',
    });
  }
};

export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
    });
  }
};
