import { Router } from "express";

import { addBookToUserController, getUserBooksController } from "../controllers/user.controller";

const router = Router();

router.post('/books', addBookToUserController);
router.get('/:userId/books', getUserBooksController);

export default router;