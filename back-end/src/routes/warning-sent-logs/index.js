import { create_warning_sent_log, get_all_warning_sent_logs, get_waning_by_warning_id } from '../../controllers/warning-sent-logs/index.js';
import {Router} from 'express';
import auth from '../auth/index.js';
import { validate } from '../..//middlewares/validate.js';
import { createWarningSentLogSchema, getByIdWarningSentLogSchema } from '../../schemas/warning-log-schema.js';
const router_warning_sent_logs = Router();


router_warning_sent_logs.get('/get-all', auth, get_all_warning_sent_logs);
router_warning_sent_logs.post('/create', validate(createWarningSentLogSchema), auth, create_warning_sent_log);
router_warning_sent_logs.get('/get-by-id', auth, validate(getByIdWarningSentLogSchema), get_waning_by_warning_id);

export default router_warning_sent_logs;