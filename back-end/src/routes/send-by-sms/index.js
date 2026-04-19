import { sendBySMS } from '../../controllers/send-by-sms/index.js';
import { auth } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { Router } from 'express';
import { sendBySMSSchema } from '../../schemas/send-sms-schema.js';

const send_by_sms_router = Router();

send_by_sms_router.post('/create', validate(sendBySMSSchema), auth, sendBySMS);
send_by_sms_router.get('/status', auth);

export default send_by_sms_router;