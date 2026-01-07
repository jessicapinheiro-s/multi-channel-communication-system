import { Router } from 'express';
import { create } from '../../controllers/recipient/index.js';

const recipient_router = Router();

recipient_router.post('/create', create);

export default recipient_router;
