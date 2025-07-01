import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../authSlice';
import { authenticateUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector(state => state.auth);
  const [email, setEmail] = useState('john@mail.com');
  const [password, setPassword] = useState('changeme');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const user = await authenticateUser({ email, password });
      dispatch(loginSuccess(user));
      navigate('/');
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)', zIndex: 10 }}>
      <form onSubmit={handleSubmit} style={{ background: 'rgba(0,0,0,0.8)', borderRadius: '16px', padding: '2rem 3rem', boxShadow: '0 0 30px #00ffcc, 0 0 60px #ff00ff', border: '2px solid #00ffcc', minWidth: '320px', maxWidth: '90vw' }}>
        <h2 style={{ color: '#00ffcc', textShadow: '0 0 10px #00ffcc, 0 0 20px #ff00ff' }}>Iniciar Sesión</h2>
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.8em',
              borderRadius: '8px',
              border: '2px solid #ff00ff',
              background: 'transparent',
              color: '#fff',
              fontSize: '1em',
              marginBottom: '1em',
              outline: 'none',
              boxShadow: '0 0 10px #ff00ff',
              textShadow: '0 0 2px #00ffcc'
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.8em',
              borderRadius: '8px',
              border: '2px solid #00ffcc',
              background: 'transparent',
              color: '#fff',
              fontSize: '1em',
              outline: 'none',
              boxShadow: '0 0 10px #00ffcc',
              textShadow: '0 0 2px #ff00ff'
            }}
          />
        </div>
        <button type="submit" disabled={isLoading} style={{ width: '100%', marginBottom: '1em' }}>
          {isLoading ? 'Ingresando...' : 'Ingresar'}
        </button>
        {error && <div style={{ color: '#ff00ff', marginTop: '1em', textShadow: '0 0 5px #ff00ff' }}>{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;