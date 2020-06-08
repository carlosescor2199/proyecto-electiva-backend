import { Router } from 'express';
const router = Router();

import controller from '../controllers/admin.controller';

//Destructuring controller
const { login } = controller;



router.route('/')
            .post(login)

export default router;