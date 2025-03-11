import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller';
import { verifyToken } from '../utils/token';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', verifyToken, logout);

export default router;
