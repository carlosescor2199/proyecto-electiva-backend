import { Router } from 'express';
const router = Router();

//Import controller
import controller from '../controllers/proyecto.controller';

//Destructuring controller
const { getProyectos, createProyectos, getProyectoById, deleteProyectos, updateProyectos } = controller;



router.route('/')
            .get(getProyectos)
            .post(createProyectos)

router.route('/:id')
            .get(getProyectoById)
            .put(updateProyectos)
            .delete(deleteProyectos)

export default router;