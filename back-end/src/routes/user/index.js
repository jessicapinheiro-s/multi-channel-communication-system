import { Router }   from 'express';
import {
    get_user_by_id,
    get_user_by_email,
    delete_item,
    update,
    create
} from '../../controllers/user/index.js';
import { auth } from '@/middlewares/auth.js';

const router_user = Router();

router_user.post('/create', create);
router_user.put('/update', auth, update);
router_user.delete('/delete', auth, delete_item);
router_user.get('/get-by-email', auth, get_user_by_email);
router_user.get('/get-by-id', auth, get_user_by_id);

export default router_user;