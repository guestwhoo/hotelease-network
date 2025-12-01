import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import publicacionesRoutes from './routes/publicaciones.js';
import usuariosRoutes from './routes/usuarios.js';
import comentariosRoutes from './routes/comentarios.js';
import reaccionesRoutes from './routes/reacciones.js';
import seguidoresRoutes from './routes/seguidores.js';
import mensajesRoutes from './routes/mensajes.js';
import notificacionesRoutes from './routes/notificaciones.js';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'HotelEase API',
            version: '1.0.0',
            description: 'API para gestionar la red social de HotelEase',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo (Node.js)'
            },
            {
                url: '/',
                description: 'Servidor actual (Relativo)'
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/comentarios', comentariosRoutes);
app.use('/api/reacciones', reaccionesRoutes);
app.use('/api/seguidores', seguidoresRoutes);
app.use('/api/mensajes', mensajesRoutes);
app.use('/api/notificaciones', notificacionesRoutes);

// Conectar a MongoDB y arrancar servidor
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/HotelEase';

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('MongoDB conectado a HotelEase');
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
})
.catch(err => console.error('Error al conectar a MongoDB', err));
