import { pool } from '../database'

export default {
    getCarreras: async (req, res) => {
        const response = await pool.query('SELECT * FROM carrera');
        res.status(200).json(response.rows);
    },

    getCarreraById: async (req, res) => {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM carrera WHERE "idCarrera" = $1', [id]);
        res.status(200).json(response.rows);
    },

    createCarrera: async (req, res) => {
        const { nombre } = req.body;
        const response = await pool.query('INSERT INTO carrera (nombre) VALUES ($1)', [nombre]);
        res.status(200).json({
            message: "Carrera creada satisfactoriamente",
            body: {carrera: {nombre}}
        })
    },

    updateCarrera: async (req, res) => {
        const id = req.params.id;
        const { nombre } = req.body;
        const response = await pool.query('UPDATE carrera SET "nombre" = $1 WHERE "idCarrera" = $2', [nombre, id]);
        res.status(200).json({message: `Carrera ${id} actualizada satisfactoriamente`});
    },

    deleteCarrera: async (req, res) => {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM carrera WHERE "idCarrera" = $1', [id]);
        res.status(200).json({message: `Carrera ${id} eliminada satisfactoriamente`});
    }

};