// backend/src/routes/auth.routes.ts
import { Router } from 'express';
import { register } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);

export default router;