import { pool } from '../database'

export default {
    getProyectos: async (req, res) => {
        const response = await pool.query('SELECT * FROM proyecto');
        res.status(200).json(response.rows);
    },

    getProyectoById: async (req, res) => {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM proyecto WHERE "idProyecto" = $1', [id]);
        res.status(200).json(response.rows);
    },

    createProyectos: async (req, res) => {
        const { nombre, descripcion } = req.body;
        const response = await pool.query('INSERT INTO proyecto (nombre, descripcion) VALUES ($1, $2)', [nombre, descripcion]);
        res.status(200).json({
            message: "Proyecto creado satisfactoriamente",
            body: {user: {nombre, descripcion}}
        })
    },

    updateProyectos: async (req, res) => {
        const id = req.params.id;
        const { nombre, descripcion } = req.body;
        const response = await pool.query('UPDATE proyecto SET "nombre" = $1, "descripcion" = $2 WHERE "idProyecto" = $3', [nombre, descripcion, id]);
        console.log(response);
        res.status(200).json({message: `Proyecto ${id} actualizado satisfactoriamente`});
    },

    deleteProyectos: async (req, res) => {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM proyecto WHERE "idProyecto" = $1', [id]);
        res.status(200).json({message: `Proyecto ${id} eliminado satisfactoriamente`});
    }

};