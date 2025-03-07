import {  Router } from 'express';
import { get_qoute } from '../controllers/qoute.controller';

const router = Router();

router.get('/', get_qoute);

export default router;