import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import publicacionesRoutes from './routes/publicaciones.js';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();
const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'HotelEase API',
            version: '1.0.0',
            description: 'API para gestionar publicaciones de HotelEase',
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

// Conectar a MongoDB y arrancar servidor
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/HotelEase';

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('MongoDB conectado a HotelEase');
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
})
.catch(err => console.error('Error al conectar a MongoDB', err));
