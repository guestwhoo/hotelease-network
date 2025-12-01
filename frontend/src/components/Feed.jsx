import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from './CreatePost';
import { useAuth } from '../context/AuthContext';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/publicaciones');
      // Sort by date desc
      const sorted = res.data.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
      setPosts(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <CreatePost onPostCreated={fetchPosts} />
      {posts.map(post => (
        <div key={post.id_publicacion} className="card">
          <div className="post-header">
            <div className="post-avatar"></div>
            <div>
              <div className="post-author">Usuario {post.id_usuario}</div>
              <div className="post-date">{new Date(post.fecha_creacion).toLocaleString()}</div>
            </div>
          </div>
          <p>{post.contenido_texto}</p>
          {post.multimedia_url && (
            <img src={post.multimedia_url} alt="Post content" style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '10px' }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Feed;
