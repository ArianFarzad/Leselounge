import { Router } from 'express';
import { get_qoute } from '../controllers/qoute.controller';
import { verifyToken } from '../utils/token';

const router = Router();

router.get('/', verifyToken, get_qoute);

export default router;
