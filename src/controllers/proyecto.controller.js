import { pool } from '../database'
import Authentication from '../Auth/Auth'

const { Auth } = Authentication

export default {
    getProyectos: async (req, res) => {
        const response = await pool.query(`SELECT proyecto."idProyecto", proyecto.nombre as nombreProyecto, proyecto.descripcion,
        proyecto."idAsignatura", 
        asignatura.nombre as nombreAsignatura, proyecto."idProfesor",
        CONCAT(profesor.apellido, ' ', profesor.nombre) as nombreProfesor
        FROM proyecto
        JOIN asignatura ON proyecto."idAsignatura" = asignatura."idAsignatura"
        JOIN profesor ON proyecto."idProfesor" = profesor."idProfesor"
        ORDER BY proyecto.nombre ASC;`);
        return res.status(200).json(response.rows);
    },

    getProyectoById: async (req, res) => {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM proyecto WHERE "idProyecto" = $1', [id]);
        return res.status(200).json(response.rows);
    },

    createProyectos: async (req, res) => {
        const { nombre, descripcion, idAsignatura, idProfesor } = req.body;
        const response = await pool.query('INSERT INTO proyecto (nombre, descripcion, "idAsignatura", "idProfesor") VALUES ($1, $2, $3, $4)', [nombre, descripcion, idAsignatura, idProfesor]);
        return res.status(200).json({
            success: "Proyecto creado satisfactoriamente",
            body: {user: {nombre, descripcion}}
        })
    },

    updateProyectos: async (req, res) => {
        const id = req.params.id;
        const { nombre, descripcion, idAsignatura, idProfesor } = req.body;
        const response = await pool.query('UPDATE proyecto SET "nombre" = $1, "descripcion" = $2, "idAsignatura" = $3, "idProfesor" = $4  WHERE "idProyecto" = $5', [nombre, descripcion, idAsignatura, idProfesor, id]);
        return res.status(200).json({success: `Proyecto ${id} actualizado satisfactoriamente`});
    },

    deleteProyectos: async (req, res) => {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM proyecto WHERE "idProyecto" = $1', [id]);
        return res.status(200).json({success: `Proyecto ${id} eliminado satisfactoriamente`});
    }

};