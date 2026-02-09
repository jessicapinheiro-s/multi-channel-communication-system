import { sendBySMS } from '@/controllers/send-by-sms';
import { auth } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import { Router } from 'express';

const send_by_sms_router = Router();

send_by_sms_router.post('/create', validate(), auth, sendBySMS);
send_by_sms_router.get('/status', auth);

export default send_by_sms_router;