import { Router } from 'express';
const router = Router();

import controller from '../controllers/asignatura.controller';

//Destructuring controller
const { getAsignaturas, getAsignaturaById, createAsignatura, updateAsignatura, deleteAsignatura } = controller;



router.route('/')
            .get(getAsignaturas)
            .post(createAsignatura)

router.route('/:id')
            .get(getAsignaturaById)
            .put(updateAsignatura)
            .delete(deleteAsignatura)

export default router;