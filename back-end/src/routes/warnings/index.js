import {Router} from 'express';
const router_warning = Router();

router_warning.get('/get-all', get_all_warnings);
router_warning.post('/create', create_warning); 
router_warning.patch('/update', update_warning);

export default router_warning;