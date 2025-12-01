import mongoose from 'mongoose';

const notificacionSchema = new mongoose.Schema({
  id_notificacion: {
    type: Number,
    required: true,
    unique: true
  },
  id_usuario: {
    type: Number,
    required: true
  },
  mensaje: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
}, { collection: 'notificaciones' });

const Notificacion = mongoose.model('Notificacion', notificacionSchema);

export default Notificacion;
