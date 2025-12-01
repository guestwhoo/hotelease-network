import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  id_usuario: {
    type: Number,
    required: true,
    unique: true
  },
  nombre_usuario: {
    type: String,
    required: true,
    unique: true
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  },
  foto_perfil: {
    type: String,
    required: false
  },
  biografia: {
    type: String,
    required: false
  }
}, { collection: 'usuarios' });

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
