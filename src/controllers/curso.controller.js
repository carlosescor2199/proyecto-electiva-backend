import { pool } from '../database'

export default {
    getCursos: async (req, res) => {
        const response = await pool.query('SELECT * FROM curso');
        res.status(200).json(response.rows);
    },

    getCursoById: async (req, res) => {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM curso WHERE "idCurso" = $1', [id]);
        res.status(200).json(response.rows);
    },

    createCurso: async (req, res) => {
        const { grupo, idAsignatura, idProfesor } = req.body;
        const response = await pool.query('INSERT INTO curso (grupo, idAsignatura, idProfesor) VALUES ($1, $2, $3)', [grupo, idAsignatura, idProfesor]);
        res.status(200).json({
            message: "Curso creado satisfactoriamente",
            body: {curso: {grupo, idAsignatura, idProfesor}}
        })
    },

    updateCurso: async (req, res) => {
        const id = req.params.id;
        const { grupo, idAsignatura, idProfesor } = req.body;
        const response = await pool.query('UPDATE curso SET "grupo" = $1, "idAsignatura" = $2, "idProfesor" = $3 WHERE "idCurso" = $4', [grupo, idAsignatura, idProfesor, id]);
        console.log(response);
        res.status(200).json({message: `Curso ${id} actualizado satisfactoriamente`});
    },

    deleteCurso: async (req, res) => {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM curso WHERE "idCurso" = $1', [id]);
        res.status(200).json({message: `Curso ${id} eliminado satisfactoriamente`});
    }

};