import mongoose from 'mongoose';

const reaccionSchema = new mongoose.Schema({
  id_reaccion: {
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
  tipo_reaccion: {
    type: String,
    required: true,
    enum: ['like', 'love', 'wow', 'sad', 'angry']
  }
}, { collection: 'reacciones' });

const Reaccion = mongoose.model('Reaccion', reaccionSchema);

export default Reaccion;
