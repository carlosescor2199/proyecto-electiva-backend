import { pool } from '../database'

export default {
    getAsignaturas: async (req, res) => {
        const response = await pool.query('SELECT asignatura."idAsignatura", asignatura.nombre as nombreAsignatura, asignatura."idCarrera", carrera.nombre as nombreCarrera FROM asignatura INNER JOIN carrera ON asignatura."idCarrera" = carrera."idCarrera" ORDER BY asignatura.nombre ASC;');
        return res.status(200).json(response.rows);
    },

    getAsignaturaById: async (req, res) => {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM asignatura WHERE "idAsignatura" = $1', [id]);
        return res.status(200).json(response.rows);
    },

    createAsignatura: async (req, res) => {
        const { nombre, idCarrera } = req.body;
        const response = await pool.query('INSERT INTO asignatura (nombre, "idCarrera") VALUES ($1, $2)', [nombre, idCarrera]);
        return res.status(200).json({
            success: "Asignatura creada satisfactoriamente"
        })
    },

    updateAsignatura: async (req, res) => {
        const id = req.params.id;
        const { nombre, idCarrera } = req.body;
        const response = await pool.query('UPDATE asignatura SET "nombre" = $1, "idCarrera" = $2 WHERE "idAsignatura" = $3', [nombre, idCarrera, id]);
        return res.status(200).json({success: `Asignatura ${id} actualizado satisfactoriamente`});
    },

    deleteAsignatura: async (req, res) => {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM asignatura WHERE "idAsignatura" = $1', [id]);
        return res.status(200).json({success: `Asignatura ${id} eliminado satisfactoriamente`});
    }

};