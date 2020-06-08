import { Router } from 'express';
const router = Router();

import controller from '../controllers/admin.controller';

//Destructuring controller
const { getAdmin } = controller;



router.route('/')
            .get(getAdmin)

export default router;