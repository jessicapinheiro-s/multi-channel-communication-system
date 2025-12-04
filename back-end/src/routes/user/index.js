import { Router }   from 'express';
import {
    get_user_by_id,
    get_user_by_email,
    delete_item,
    update,
    create
} from '../../controllers/user/index.js';

const router_user = Router();

router_user.post('/create', create);
router_user.put('/update', update);
router_user.delete('/delete', delete_item);
router_user.post('/get-by-email', get_user_by_email);
router_user.post('/get-by-id', get_user_by_id);

export default router_user;