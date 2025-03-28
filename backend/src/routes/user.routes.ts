import { Router } from 'express';
import { verifyToken } from '../utils/token';
import {
  addBookToUserController,
  getUserBooksController,
  getUserByIdController,
  deleteUserBookController,
  updateUserBookStatusController,
} from '../controllers/user.controller';

const router = Router();

router.post('/books', verifyToken, addBookToUserController);
router.get('/:userId', verifyToken, getUserByIdController);
router.get('/:userId/books', verifyToken, getUserBooksController);
router.delete('/books/:userId/:bookId', verifyToken, deleteUserBookController);
router.put('/books', verifyToken, updateUserBookStatusController);

export default router;
