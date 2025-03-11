import { Router } from 'express';
import { verifyToken } from '../utils/token';
import {
  addBookToUserController,
  getUserBooksController,
} from '../controllers/user.controller';

const router = Router();

router.post('/books', verifyToken, addBookToUserController);
router.get('/:userId/books', verifyToken, getUserBooksController);

export default router;
