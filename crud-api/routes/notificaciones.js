import express from 'express';
import Notificacion from '../models/Notificacion.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Notificacion:
 *       type: object
 *       required:
 *         - id_notificacion
 *         - id_usuario
 *         - mensaje
 *       properties:
 *         id_notificacion:
 *           type: integer
 *           description: ID único de la notificación
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario que recibe la notificación
 *         mensaje:
 *           type: string
 *           description: Contenido de la notificación
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha de la notificación
 *       example:
 *         id_notificacion: 604
 *         id_usuario: 1
 *         mensaje: "carlos_diaz ha reaccionado a tu publicación."
 */

/**
 * @swagger
 * /api/notificaciones:
 *   get:
 *     summary: Obtener todas las notificaciones
 *     tags: [Notificaciones]
 *     responses:
 *       200:
 *         description: Lista de todas las notificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notificacion'
 */
router.get('/', async (req, res) => {
  try {
    const notificaciones = await Notificacion.find();
    res.json(notificaciones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/notificaciones/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener notificaciones de un usuario
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de notificaciones del usuario
 */
router.get('/usuario/:id_usuario', async (req, res) => {
  try {
    const notificaciones = await Notificacion.find({ id_usuario: req.params.id_usuario }).sort({ fecha: -1 });
    res.json(notificaciones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/notificaciones/{id}:
 *   get:
 *     summary: Obtener una notificación por ID
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Notificación encontrada
 *       404:
 *         description: Notificación no encontrada
 */
router.get('/:id', async (req, res) => {
  try {
    const notificacion = await Notificacion.findOne({ id_notificacion: req.params.id });
    if (!notificacion) return res.status(404).json({ message: 'Notificación no encontrada' });
    res.json(notificacion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/notificaciones:
 *   post:
 *     summary: Crear una nueva notificación
 *     tags: [Notificaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notificacion'
 *     responses:
 *       201:
 *         description: Notificación creada exitosamente
 */
router.post('/', async (req, res) => {
  const notificacion = new Notificacion(req.body);
  try {
    const nuevaNotificacion = await notificacion.save();
    res.status(201).json(nuevaNotificacion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/notificaciones/{id}:
 *   delete:
 *     summary: Eliminar una notificación
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la notificación
 *     responses:
 *       200:
 *         description: Notificación eliminada
 */
router.delete('/:id', async (req, res) => {
  try {
    const notificacion = await Notificacion.findOneAndDelete({ id_notificacion: req.params.id });
    if (!notificacion) return res.status(404).json({ message: 'Notificación no encontrada' });
    res.json({ message: 'Notificación eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
