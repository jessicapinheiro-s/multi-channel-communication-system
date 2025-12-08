import { Router } from 'express';
import{
    login,
    register,
    logout
} from '../../controllers/auth/index.js';
import { auth } from '@/middlewares/auth.js';

const auth_router = Router();

auth_router.post('/login', auth, login);
auth_router.post('/logout', logout);
auth_router.post('/register', register);

export default auth_router;