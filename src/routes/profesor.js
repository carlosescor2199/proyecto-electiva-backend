import { Router } from 'express';
const router = Router();

//Import controller
import controller from '../controllers/profesor.controller';

//Destructuring controller
const { getProfesores, searchProfesor, createProfesor, updateProfesor, deleteProfesor } = controller;



router.route('/')
            .get(getProfesores)
            .post(createProfesor)

router.route('/:id')
            .put(updateProfesor)
            .delete(deleteProfesor)

router.route('/search')
            .post(searchProfesor)

export default router;