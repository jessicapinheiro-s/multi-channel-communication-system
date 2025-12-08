import { create_warning, delete_warning, get_by_id_warning, update_warning } from '@/controllers/warnings';
import {Router} from 'express';
const router_warning = Router();

router_warning.post('/create', create_warning); 
router_warning.patch('/update', update_warning);
router_warning.delete('/delete', delete_warning);
router_warning.get('/get-by-id', get_by_id_warning);

export default router_warning;