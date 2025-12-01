import mongoose from 'mongoose';

const comentarioSchema = new mongoose.Schema({
  id_comentario: {
    type: Number,
    required: true,
    unique: true
  },
  id_usuario: {
    type: Number,
    required: true
  },
  id_publicacion: {
    type: Number,
    required: true
  },
  comentario: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
}, { collection: 'comentarios' });

const Comentario = mongoose.model('Comentario', comentarioSchema);

export default Comentario;
