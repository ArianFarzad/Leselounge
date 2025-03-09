import { Request, Response } from 'express';
import { getOrFetchBook, getOrFetchBookByTitle } from '../services/bookService';



export const getBookDetailsController = async (req: Request, res: Response): Promise<void> => {
  const { bookId } = req.params;

  try {
    const book = await getOrFetchBook(bookId);

    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book details fetched successfully',
      data: book,
    });
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch book details',
    });
  }
};

export const getBookDetailsByTitleController = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.params;

  try {
    const book = await getOrFetchBookByTitle(title);

    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Book details fetched successfully',
      data: book,
    });
  } catch (error) {
    console.error('Error fetching book details by title:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch book details',
    });
  }
};