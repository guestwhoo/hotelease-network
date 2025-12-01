import mongoose from 'mongoose';

const seguidorSchema = new mongoose.Schema({
  id_seguidor: {
    type: Number,
    required: true,
    unique: true
  },
  id_usuario: {
    type: Number,
    required: true
  },
  id_seguido: {
    type: Number,
    required: true
  }
}, { collection: 'seguidores' });

const Seguidor = mongoose.model('Seguidor', seguidorSchema);

export default Seguidor;
