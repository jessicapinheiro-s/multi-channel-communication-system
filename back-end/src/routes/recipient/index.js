import { Router } from 'express';
import { create, get_all } from '../../controllers/recipient/index.js';
import { validate } from '../../middlewares/validate.js';
import { createRecipientSchema } from '../../schemas/recipient-schema.js';

const recipient_router = Router();

recipient_router.post('/create', validate(createRecipientSchema), create);
recipient_router.get('/get-all', get_all);

export default recipient_router;
