import express from 'express';
import Publicacion from '../models/Publicacion.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Publicacion:
 *       type: object
 *       required:
 *         - id_publicacion
 *         - id_usuario
 *         - contenido_texto
 *       properties:
 *         id_publicacion:
 *           type: integer
 *           description: ID único de la publicación
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario que crea la publicación
 *         contenido_texto:
 *           type: string
 *           description: Contenido de la publicación
 *         multimedia_url:
 *           type: string
 *           description: URL del contenido multimedia
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *       example:
 *         id_publicacion: 103
 *         id_usuario: 1
 *         contenido_texto: "Disfrutando de la piscina"
 *         multimedia_url: "/img/posts/piscina.jpg"
 */

/**
 * @swagger
 * /api/publicaciones:
 *   get:
 *     summary: Obtener todas las publicaciones
 *     tags: [Publicaciones]
 *     responses:
 *       200:
 *         description: Lista de todas las publicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Publicacion'
 */
router.get('/', async (req, res) => {
  try {
    const publicaciones = await Publicacion.find();
    res.json(publicaciones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/publicaciones/{id}:
 *   get:
 *     summary: Obtener una publicación por ID
 *     tags: [Publicaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Publicación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publicacion'
 *       404:
 *         description: Publicación no encontrada
 */
router.get('/:id', async (req, res) => {
  try {
    const publicacion = await Publicacion.findOne({ id_publicacion: req.params.id });
    if (!publicacion) return res.status(404).json({ message: 'Publicación no encontrada' });
    res.json(publicacion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/publicaciones:
 *   post:
 *     summary: Crear una nueva publicación
 *     tags: [Publicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Publicacion'
 *     responses:
 *       201:
 *         description: Publicación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publicacion'
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/', async (req, res) => {
  const publicacion = new Publicacion({
    id_publicacion: req.body.id_publicacion,
    id_usuario: req.body.id_usuario,
    contenido_texto: req.body.contenido_texto,
    multimedia_url: req.body.multimedia_url,
    fecha_creacion: req.body.fecha_creacion || Date.now()
  });

  try {
    const nuevaPublicacion = await publicacion.save();
    res.status(201).json(nuevaPublicacion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
