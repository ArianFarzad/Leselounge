import express from 'express';
import {
  getBookDetailsController,
  getBookDetailsByTitleController,
} from '../controllers/book.controller';

const router = express.Router();

router.get('/:bookId', getBookDetailsController);
router.get('/title/:title', getBookDetailsByTitleController);

export default router;