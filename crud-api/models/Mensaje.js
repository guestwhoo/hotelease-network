import mongoose from 'mongoose';

const mensajeSchema = new mongoose.Schema({
  id_mensaje: {
    type: Number,
    required: true,
    unique: true
  },
  id_emisor: {
    type: Number,
    required: true
  },
  id_receptor: {
    type: Number,
    required: true
  },
  contenido: {
    type: String,
    required: true
  },
  fecha_envio: {
    type: Date,
    default: Date.now
  }
}, { collection: 'mensajes' });

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

export default Mensaje;
