import { Router } from 'express';
const router = Router();

import controller from '../controllers/carrera.controller';

//Destructuring controller
const { getCarreras, getCarreraById, createCarrera, updateCarrera, deleteCarrera } = controller;



router.route('/')
            .get(getCarreras)
            .post(createCarrera)

router.route('/:id')
            .get(getCarreraById)
            .put(updateCarrera)
            .delete(deleteCarrera)

export default router;