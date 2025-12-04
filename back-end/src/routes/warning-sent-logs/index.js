import {Router} from 'express';

const router_warning_sent_logs = Router();


router_warning_sent_logs.get('/get-all', get_all_warning_sent_logs);
router_warning_sent_logs.post('/create', create_warning_sent_log);

export default router_warning_sent_logs;