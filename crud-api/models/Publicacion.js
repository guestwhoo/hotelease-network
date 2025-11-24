import mongoose from 'mongoose';

const publicacionSchema = new mongoose.Schema({
  id_publicacion: {
    type: Number,
    required: true,
    unique: true
  },
  id_usuario: {
    type: Number,
    required: true
  },
  contenido_texto: {
    type: String,
    required: true
  },
  multimedia_url: {
    type: String,
    required: false
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  }
}, { collection: 'publicaciones' });

const Publicacion = mongoose.model('Publicacion', publicacionSchema);

export default Publicacion;
