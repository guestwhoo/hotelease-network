import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ correo: '', contraseña: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/usuarios/login', formData);
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
        <h2 style={{ textAlign: 'center', color: '#1877f2' }}>HotelEase</h2>
        <h3 style={{ textAlign: 'center' }}>Iniciar Sesión</h3>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
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
          <button className="btn" style={{ width: '100%' }} type="submit">Entrar</button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/register">¿No tienes cuenta? Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
