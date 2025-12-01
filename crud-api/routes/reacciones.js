import express from 'express';
import Reaccion from '../models/Reaccion.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Reaccion:
 *       type: object
 *       required:
 *         - id_reaccion
 *         - id_usuario
 *         - id_publicacion
 *         - tipo_reaccion
 *       properties:
 *         id_reaccion:
 *           type: integer
 *           description: ID único de la reacción
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario que reacciona
 *         id_publicacion:
 *           type: integer
 *           description: ID de la publicación
 *         tipo_reaccion:
 *           type: string
 *           enum: [like, love, wow, sad, angry]
 *           description: Tipo de reacción
 *       example:
 *         id_reaccion: 304
 *         id_usuario: 1
 *         id_publicacion: 102
 *         tipo_reaccion: "like"
 */

/**
 * @swagger
 * /api/reacciones:
 *   get:
 *     summary: Obtener todas las reacciones
 *     tags: [Reacciones]
 *     responses:
 *       200:
 *         description: Lista de todas las reacciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reaccion'
 */
router.get('/', async (req, res) => {
  try {
    const reacciones = await Reaccion.find();
    res.json(reacciones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/reacciones/publicacion/{id_publicacion}:
 *   get:
 *     summary: Obtener reacciones de una publicación
 *     tags: [Reacciones]
 *     parameters:
 *       - in: path
 *         name: id_publicacion
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Lista de reacciones de la publicación
 */
router.get('/publicacion/:id_publicacion', async (req, res) => {
  try {
    const reacciones = await Reaccion.find({ id_publicacion: req.params.id_publicacion });
    res.json(reacciones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/reacciones/{id}:
 *   get:
 *     summary: Obtener una reacción por ID
 *     tags: [Reacciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reacción
 *     responses:
 *       200:
 *         description: Reacción encontrada
 *       404:
 *         description: Reacción no encontrada
 */
router.get('/:id', async (req, res) => {
  try {
    const reaccion = await Reaccion.findOne({ id_reaccion: req.params.id });
    if (!reaccion) return res.status(404).json({ message: 'Reacción no encontrada' });
    res.json(reaccion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/reacciones:
 *   post:
 *     summary: Crear una nueva reacción
 *     tags: [Reacciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reaccion'
 *     responses:
 *       201:
 *         description: Reacción creada exitosamente
 */
router.post('/', async (req, res) => {
  const reaccion = new Reaccion(req.body);
  try {
    const nuevaReaccion = await reaccion.save();
    res.status(201).json(nuevaReaccion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/reacciones/{id}:
 *   put:
 *     summary: Actualizar una reacción
 *     tags: [Reacciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reacción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reaccion'
 *     responses:
 *       200:
 *         description: Reacción actualizada
 */
router.put('/:id', async (req, res) => {
  try {
    const reaccion = await Reaccion.findOneAndUpdate(
      { id_reaccion: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!reaccion) return res.status(404).json({ message: 'Reacción no encontrada' });
    res.json(reaccion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/reacciones/{id}:
 *   delete:
 *     summary: Eliminar una reacción
 *     tags: [Reacciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reacción
 *     responses:
 *       200:
 *         description: Reacción eliminada
 */
router.delete('/:id', async (req, res) => {
  try {
    const reaccion = await Reaccion.findOneAndDelete({ id_reaccion: req.params.id });
    if (!reaccion) return res.status(404).json({ message: 'Reacción no encontrada' });
    res.json({ message: 'Reacción eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
