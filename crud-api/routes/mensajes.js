import express from 'express';
import Mensaje from '../models/Mensaje.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Mensaje:
 *       type: object
 *       required:
 *         - id_mensaje
 *         - id_emisor
 *         - id_receptor
 *         - contenido
 *       properties:
 *         id_mensaje:
 *           type: integer
 *           description: ID único del mensaje
 *         id_emisor:
 *           type: integer
 *           description: ID del usuario emisor
 *         id_receptor:
 *           type: integer
 *           description: ID del usuario receptor
 *         contenido:
 *           type: string
 *           description: Contenido del mensaje
 *         fecha_envio:
 *           type: string
 *           format: date-time
 *           description: Fecha de envío
 *       example:
 *         id_mensaje: 503
 *         id_emisor: 1
 *         id_receptor: 3
 *         contenido: "¡Hola! ¿Cómo estás?"
 */

/**
 * @swagger
 * /api/mensajes:
 *   get:
 *     summary: Obtener todos los mensajes
 *     tags: [Mensajes]
 *     responses:
 *       200:
 *         description: Lista de todos los mensajes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mensaje'
 */
router.get('/', async (req, res) => {
  try {
    const mensajes = await Mensaje.find();
    res.json(mensajes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/mensajes/conversacion/{id_usuario1}/{id_usuario2}:
 *   get:
 *     summary: Obtener conversación entre dos usuarios
 *     tags: [Mensajes]
 *     parameters:
 *       - in: path
 *         name: id_usuario1
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del primer usuario
 *       - in: path
 *         name: id_usuario2
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del segundo usuario
 *     responses:
 *       200:
 *         description: Mensajes de la conversación
 */
router.get('/conversacion/:id_usuario1/:id_usuario2', async (req, res) => {
  try {
    const { id_usuario1, id_usuario2 } = req.params;
    const mensajes = await Mensaje.find({
      $or: [
        { id_emisor: id_usuario1, id_receptor: id_usuario2 },
        { id_emisor: id_usuario2, id_receptor: id_usuario1 }
      ]
    }).sort({ fecha_envio: 1 });
    res.json(mensajes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/mensajes/enviados/{id_usuario}:
 *   get:
 *     summary: Obtener mensajes enviados por un usuario
 *     tags: [Mensajes]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de mensajes enviados
 */
router.get('/enviados/:id_usuario', async (req, res) => {
  try {
    const mensajes = await Mensaje.find({ id_emisor: req.params.id_usuario });
    res.json(mensajes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/mensajes/recibidos/{id_usuario}:
 *   get:
 *     summary: Obtener mensajes recibidos por un usuario
 *     tags: [Mensajes]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de mensajes recibidos
 */
router.get('/recibidos/:id_usuario', async (req, res) => {
  try {
    const mensajes = await Mensaje.find({ id_receptor: req.params.id_usuario });
    res.json(mensajes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/mensajes/{id}:
 *   get:
 *     summary: Obtener un mensaje por ID
 *     tags: [Mensajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del mensaje
 *     responses:
 *       200:
 *         description: Mensaje encontrado
 *       404:
 *         description: Mensaje no encontrado
 */
router.get('/:id', async (req, res) => {
  try {
    const mensaje = await Mensaje.findOne({ id_mensaje: req.params.id });
    if (!mensaje) return res.status(404).json({ message: 'Mensaje no encontrado' });
    res.json(mensaje);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/mensajes:
 *   post:
 *     summary: Enviar un nuevo mensaje
 *     tags: [Mensajes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mensaje'
 *     responses:
 *       201:
 *         description: Mensaje enviado exitosamente
 */
router.post('/', async (req, res) => {
  const mensaje = new Mensaje(req.body);
  try {
    const nuevoMensaje = await mensaje.save();
    res.status(201).json(nuevoMensaje);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /api/mensajes/{id}:
 *   delete:
 *     summary: Eliminar un mensaje
 *     tags: [Mensajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del mensaje
 *     responses:
 *       200:
 *         description: Mensaje eliminado
 */
router.delete('/:id', async (req, res) => {
  try {
    const mensaje = await Mensaje.findOneAndDelete({ id_mensaje: req.params.id });
    if (!mensaje) return res.status(404).json({ message: 'Mensaje no encontrado' });
    res.json({ message: 'Mensaje eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
