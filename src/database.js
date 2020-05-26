import { Pool } from 'pg'

export const pool = new Pool({
    host: 'localhost',
    user:'postgres',
    password: 'Carlis2199',
    database: 'repositorio_proyectos',
    port: '5432'
})