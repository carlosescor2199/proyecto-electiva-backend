import express from 'express';
import cors from 'cors';
import 'dotenv/config';
const app = express();

//Import routes
import proyecto from './routes/proyecto';
import curso from './routes/curso';
import profesor from './routes/profesor';
import asignatura from './routes/asignatura';
import carrera from './routes/carrera'

//settings
app.set('port', process.env.PORT || 5000);

//Middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/proyectos', proyecto);
app.use('/cursos', curso);
app.use('/profesores', profesor);
app.use('/asignaturas', asignatura);
app.use('/carreras', carrera);

export default app;


