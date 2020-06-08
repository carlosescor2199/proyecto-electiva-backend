import express from 'express';
import cors from 'cors';
import 'dotenv/config';
const app = express();

//Import routes
import auth from './routes/auth'
import admin from './routes/admin'
import proyecto from './routes/proyecto';
import profesor from './routes/profesor';
import asignatura from './routes/asignatura';
import carrera from './routes/carrera'

//settings
app.set('port', process.env.PORT || 5000);

//Middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/auth', auth);
app.use('/admin', admin);
app.use('/proyectos', proyecto);
app.use('/profesores', profesor);
app.use('/asignaturas', asignatura);
app.use('/carreras', carrera);

export default app;


