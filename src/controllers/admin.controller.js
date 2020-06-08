import jwt from 'jsonwebtoken'
import { pool } from '../database'
import 'dotenv/config'
import Authentication from '../Auth/Auth'

const { Auth } = Authentication

export default {
    login: async (req, res) => {
        const { id, password } = req.body
        const response = await pool.query('SELECT * FROM admin where id = $1', [id]);
        
        if(response.rowCount === 0){
            return res.status(200).json({error: 'El administrador no existe'});
        }

        const admin = response.rows[0];

        if(admin.password !== password){
            return res.status(200).json({error: 'Contraseña incorrecta'});
        }

        const token = jwt.sign({id}, process.env.SECRET, {
            expiresIn: 60 * 60 * 24
        })


        return res.status(200).json({auth: true, token});
    },

    getAdmin: async (req, res) => {
        const admin = Auth(req.headers['x-token']);
        if(admin.auth){
            return res.status(200).json({
                success: admin.auth,
                admin: admin.admin
            })
        }

        return res.status(200).json({
            success: admin.auth
        })
    }

};