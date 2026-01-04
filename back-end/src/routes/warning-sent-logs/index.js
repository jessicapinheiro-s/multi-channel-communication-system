import { create_warning_sent_log, get_all_warning_sent_logs, get_waning_by_warning_id } from '../../controllers/warning-sent-logs/index.js';
import {Router} from 'express';
import auth from '../auth/index.js';
const router_warning_sent_logs = Router();


router_warning_sent_logs.get('/get-all', auth, get_all_warning_sent_logs);
router_warning_sent_logs.post('/create', auth, create_warning_sent_log);
router_warning_sent_logs.patch('/get-by-id', auth, get_waning_by_warning_id);

export default router_warning_sent_logs;