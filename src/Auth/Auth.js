import jwt from 'jsonwebtoken'
import 'dotenv/config'

export default { 
    Auth: (token) => {
        if(!token) {
            return {
                auth: false,
                error: 'No autorizado'
            };
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            return {
                auth: true,
                admin: decoded.id
            }
        } catch (error) {
            return {
                auth: false,
                error: 'Token no valido'
            }
        }

        

    }
}