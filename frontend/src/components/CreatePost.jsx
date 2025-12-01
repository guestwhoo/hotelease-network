import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const CreatePost = ({ onPostCreated }) => {
  const [contenido, setContenido] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contenido.trim() && !imageUrl) return;

    try {
      const newPost = {
        id_publicacion: Math.floor(Math.random() * 100000),
        id_usuario: user.id_usuario,
        contenido_texto: contenido,
        multimedia_url: imageUrl,
        fecha_creacion: new Date().toISOString()
      };
      
      await axios.post('/api/publicaciones', newPost);
      
      // Reset form
      setContenido('');
      setImageUrl('');
      
      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Error al crear la publicación');
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <textarea
          className="input"
          placeholder={`¿Qué estás pensando, ${user.nombre_usuario}?`}
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          rows="3"
          style={{ resize: 'none' }}
        />
        
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            className="input" 
            placeholder="Pegar URL de imagen (opcional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div style={{ textAlign: 'right' }}>
          <button 
            className="btn" 
            type="submit" 
            disabled={!contenido.trim() && !imageUrl}
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
