import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    correo: '',
    contraseña: '',
    id_usuario: Math.floor(Math.random() * 10000) // Simple random ID generation
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/usuarios', formData);
      alert('Usuario creado exitosamente. Por favor inicia sesión.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
        <h2 style={{ textAlign: 'center', color: '#1877f2' }}>HotelEase</h2>
        <h3 style={{ textAlign: 'center' }}>Registrarse</h3>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Nombre de usuario"
            value={formData.nombre_usuario}
            onChange={(e) => setFormData({...formData, nombre_usuario: e.target.value})}
            required
          />
          <input
            className="input"
            type="email"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={(e) => setFormData({...formData, correo: e.target.value})}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={(e) => setFormData({...formData, contraseña: e.target.value})}
            required
          />
          <button className="btn" style={{ width: '100%', background: '#42b72a' }} type="submit">Registrarse</button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
