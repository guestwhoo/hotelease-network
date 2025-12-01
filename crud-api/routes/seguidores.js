import express from 'express';
import Seguidor from '../models/Seguidor.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Seguidor:
 *       type: object
 *       required:
 *         - id_seguidor
 *         - id_usuario
 *         - id_seguido
 *       properties:
 *         id_seguidor:
 *           type: integer
 *           description: ID único del registro de seguidor
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario que sigue
 *         id_seguido:
 *           type: integer
 *           description: ID del usuario seguido
 *       example:
 *         id_seguidor: 404
 *         id_usuario: 1
 *         id_seguido: 3
 */

/**
 * @swagger
 * /api/seguidores:
 *   get:
 *     summary: Obtener todos los registros de seguidores
 *     tags: [Seguidores]
 *     responses:
 *       200:
 *         description: Lista de todos los seguidores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Seguidor'
 */
router.get('/', async (req, res) => {
  try {
    const seguidores = await Seguidor.find();
    res.json(seguidores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/seguidores/seguidores/{id_usuario}:
 *   get:
 *     summary: Obtener seguidores de un usuario
 *     tags: [Seguidores]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de seguidores del usuario
 */
router.get('/seguidores/:id_usuario', async (req, res) => {
  try {
    const seguidores = await Seguidor.find({ id_seguido: req.params.id_usuario });
    res.json(seguidores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/seguidores/siguiendo/{id_usuario}:
 *   get:
 *     summary: Obtener usuarios que sigue un usuario
 *     tags: [Seguidores]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de usuarios que sigue
 */
router.get('/siguiendo/:id_usuario', async (req, res) => {
  try {
    const siguiendo = await Seguidor.find({ id_usuario: req.params.id_usuario });
    res.json(siguiendo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/seguidores/{id}:
 *   get:
 *     summary: Obtener un registro de seguidor por ID
 *     tags: [Seguidores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del registro de seguidor
 *     responses:
 *       200:
 *         description: Registro encontrado
 *       404:
 *         description: Registro no encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const seguidor = await Seguidor.findOne({ id_seguidor: req.params.id });
    if (!seguidor) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json(seguidor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/seguidores:
 *   post:
 *     summary: Seguir a un usuario
 *     tags: [Seguidores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Seguidor'
 *     responses:
 *       201:
 *         description: Seguidor creado exitosamente
 */
router.post('/', async (req, res) => {
  const seguidor = new Seguidor(req.body);
  try {
    const nuevoSeguidor = await seguidor.save();
    res.status(201).json(nuevoSeguidor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/seguidores/{id}:
 *   delete:
 *     summary: Dejar de seguir a un usuario
 *     tags: [Seguidores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del registro de seguidor
 *     responses:
 *       200:
 *         description: Seguidor eliminado
 */
router.delete('/:id', async (req, res) => {
  try {
    const seguidor = await Seguidor.findOneAndDelete({ id_seguidor: req.params.id });
    if (!seguidor) return res.status(404).json({ message: 'Registro no encontrado' });
    res.json({ message: 'Has dejado de seguir al usuario' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
