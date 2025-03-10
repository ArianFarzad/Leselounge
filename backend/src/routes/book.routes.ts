import express from 'express';
import {
  getBookDetailsController,
  getBookDetailsByTitleController,
} from '../controllers/book.controller';
import { verifyToken } from '../utils/token';

const router = express.Router();

router.get('/:bookId', verifyToken, getBookDetailsController);
router.get('/title/:title', verifyToken, getBookDetailsByTitleController);

export default router;