import { Router } from 'express';
import { auth } from '../../middlewares/auth.js';


const send_by_email_router = Router();

send_by_email_router.post('/create', auth)
send_by_email_router.get('/status', auth)


export default send_by_email_router;