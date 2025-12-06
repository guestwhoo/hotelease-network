import Joi from 'joi';

export const usuarioSchema = Joi.object({
  id_usuario: Joi.number().integer().required(),
  nombre_usuario: Joi.string().min(3).max(30).required(),
  correo: Joi.string().email().required(),
  contraseña: Joi.string().min(6).required(),
  foto_perfil: Joi.string().uri().optional(),
  biografia: Joi.string().max(500).optional()
});

export const loginSchema = Joi.object({
  correo: Joi.string().email().required(),
  contraseña: Joi.string().required()
});

export const publicacionSchema = Joi.object({
  id_publicacion: Joi.number().integer().required(),
  id_usuario: Joi.number().integer().required(),
  contenido_texto: Joi.string().min(1).required(),
  multimedia_url: Joi.string().uri().allow('').optional(),
  fecha_creacion: Joi.date().iso().optional()
});
