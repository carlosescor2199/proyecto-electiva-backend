import { pool } from '../database'

export default {
    getAsignaturas: async (req, res) => {
        const response = await pool.query('SELECT * FROM asignatura');
        res.status(200).json(response.rows);
    },

    getAsignaturaById: async (req, res) => {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM asignatura WHERE "idAsignatura" = $1', [id]);
        res.status(200).json(response.rows);
    },

    createAsignatura: async (req, res) => {
        const { nombre } = req.body;
        const response = await pool.query('INSERT INTO asignatura (nombre) VALUES ($1)', [nombre]);
        res.status(200).json({
            message: "Asignatura creada satisfactoriamente",
            body: {asignatura: {nombre}}
        })
    },

    updateAsignatura: async (req, res) => {
        const id = req.params.id;
        const { nombre } = req.body;
        const response = await pool.query('UPDATE asignatura SET "nombre" = $1 WHERE "idAsignatura" = $2', [nombre, id]);
        res.status(200).json({message: `Asignatura ${id} actualizado satisfactoriamente`});
    },

    deleteAsignatura: async (req, res) => {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM asignatura WHERE "idAsignatura" = $1', [id]);
        res.status(200).json({message: `Asignatura ${id} eliminado satisfactoriamente`});
    }

};