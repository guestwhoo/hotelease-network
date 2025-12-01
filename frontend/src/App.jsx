import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const Navbar = () => {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">HotelEase</Link>
      <div className="nav-links">
        <span>Hola, {user.nombre_usuario}</span>
        <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>Cerrar Sesión</a>
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
