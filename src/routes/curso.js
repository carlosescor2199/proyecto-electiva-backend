import { Router } from 'express';
const router = Router();

//Import controller
import controller from '../controllers/curso.controller';

//Destructuring controller
const { getCursos, createCurso, getCursoById, deleteCurso, updateCurso } = controller;



router.route('/')
            .get(getCursos)
            .post(createCurso)

router.route('/:id')
            .get(getCursoById)
            .put(updateCurso)
            .delete(deleteCurso)

export default router;