import { create_warning_sent_log, get_all_warning_sent_logs, get_waning_by_warning_id } from '@/controllers/warning-sent-logs';
import {Router} from 'express';
const router_warning_sent_logs = Router();


router_warning_sent_logs.get('/get-all', get_all_warning_sent_logs);
router_warning_sent_logs.post('/create', create_warning_sent_log);
router_warning_sent_logs.patch('/get-by-id', get_waning_by_warning_id);

export default router_warning_sent_logs;