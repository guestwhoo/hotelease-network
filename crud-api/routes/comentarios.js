import express from 'express';
import Comentario from '../models/Comentario.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comentario:
 *       type: object
 *       required:
 *         - id_comentario
 *         - id_usuario
 *         - id_publicacion
 *         - comentario
 *       properties:
 *         id_comentario:
 *           type: integer
 *           description: ID único del comentario
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario que comenta
 *         id_publicacion:
 *           type: integer
 *           description: ID de la publicación comentada
 *         comentario:
 *           type: string
 *           description: Contenido del comentario
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha del comentario
 *       example:
 *         id_comentario: 204
 *         id_usuario: 2
 *         id_publicacion: 101
 *         comentario: "¡Excelente foto!"
 */

/**
 * @swagger
 * /api/comentarios:
 *   get:
 *     summary: Obtener todos los comentarios
 *     tags: [Comentarios]
 *     responses:
 *       200:
 *         description: Lista de todos los comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 */
router.get('/', async (req, res) => {
  try {
    const comentarios = await Comentario.find();
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/comentarios/publicacion/{id_publicacion}:
 *   get:
 *     summary: Obtener comentarios de una publicación
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id_publicacion
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Lista de comentarios de la publicación
 */
router.get('/publicacion/:id_publicacion', async (req, res) => {
  try {
    const comentarios = await Comentario.find({ id_publicacion: req.params.id_publicacion });
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/comentarios/{id}:
 *   get:
 *     summary: Obtener un comentario por ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario encontrado
 *       404:
 *         description: Comentario no encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const comentario = await Comentario.findOne({ id_comentario: req.params.id });
    if (!comentario) return res.status(404).json({ message: 'Comentario no encontrado' });
    res.json(comentario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/comentarios:
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentario'
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 */
router.post('/', async (req, res) => {
  const comentario = new Comentario(req.body);
  try {
    const nuevoComentario = await comentario.save();
    res.status(201).json(nuevoComentario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/comentarios/{id}:
 *   put:
 *     summary: Actualizar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentario'
 *     responses:
 *       200:
 *         description: Comentario actualizado
 */
router.put('/:id', async (req, res) => {
  try {
    const comentario = await Comentario.findOneAndUpdate(
      { id_comentario: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!comentario) return res.status(404).json({ message: 'Comentario no encontrado' });
    res.json(comentario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/comentarios/{id}:
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario eliminado
 */
router.delete('/:id', async (req, res) => {
  try {
    const comentario = await Comentario.findOneAndDelete({ id_comentario: req.params.id });
    if (!comentario) return res.status(404).json({ message: 'Comentario no encontrado' });
    res.json({ message: 'Comentario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
