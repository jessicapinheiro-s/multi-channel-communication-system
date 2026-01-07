import { Router } from 'express';
import { create, get_all } from '../../controllers/recipient/index.js';

const recipient_router = Router();

recipient_router.post('/create', create);
recipient_router.get('/get-all', get_all);

export default recipient_router;
