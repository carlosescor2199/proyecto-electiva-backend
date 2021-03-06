import { pool } from '../database'
import bcrypt from 'bcrypt'

export default {
    getProfesores: async (req, res) => {
        const response = await pool.query('SELECT * FROM profesor');
        return res.status(200).json(response.rows);
    },

    searchProfesor: async (req, res) => {
        const { search } = req.body;
        const response = await pool.query(`SELECT * FROM profesor WHERE cast("idProfesor" as varchar) like '${search+'%'}' OR lower(nombre) like '${'%'+search+'%'}' OR lower(apellido) like '${'%'+search+'%'}'`);
        return res.status(200).json(response.rows);
    },

    createProfesor: async (req, res) => {
        const { idProfesor, nombre, apellido } = req.body;
        const verificado = await verificarProfesor(idProfesor);
        if (verificado) {
            return res.status(200).json({
                error: "La cédula con la que intentó crear al profesor ya existe!"
            })
        } else {
            const response = await pool.query('INSERT INTO profesor ("idProfesor", nombre, apellido) VALUES ($1, $2, $3)', [idProfesor, nombre, apellido]);
            return res.status(200).json({
                success: "Profesor creado satisfactoriamente",
            })
        }
    },

    updateProfesor: async (req, res) => {
        const id = req.params.id;
        const { nombre, apellido } = req.body;
        if(nombre.trim() === '' || apellido.trim() ===''){
            return res.status(200).json({ error: 'Los datos no pueden estar vacios' });
        } else {
            const response = await pool.query('UPDATE profesor SET "nombre" = $1, "apellido" = $2 WHERE "idProfesor" = $3', [nombre, apellido, id]);
            return res.status(200).json({ success: 'Profesor actualizado satisfactoriamente' });
        }
        
    },

    deleteProfesor: async (req, res) => {
        const id = req.params.id;
        const response = await pool.query('DELETE FROM profesor WHERE "idProfesor" = $1', [id]);
        return res.status(200).json({ success: 'Profesor eliminado satisfactoriamente' });
    },


};

const verificarProfesor = async (idProfesor) => {
    const verificar = await pool.query('SELECT * FROM profesor WHERE "idProfesor" = $1', [idProfesor])
    if(verificar.rowCount > 0){
        return true
    }
    return false
}