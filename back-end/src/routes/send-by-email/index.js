import { Router } from 'express';
import { auth } from '../../middlewares/auth.js';
import { validate } from '@/middlewares/validate.js';
import { sendEmailSchema } from '@/schemas/send-email-schema.js';
import { send_email } from '@/controllers/send-by-email/index.js';


const send_by_email_router = Router();

send_by_email_router.post('/create', auth, validate(sendEmailSchema), send_email)
send_by_email_router.get('/status', auth)


export default send_by_email_router;