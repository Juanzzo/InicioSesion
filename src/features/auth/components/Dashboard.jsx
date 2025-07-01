import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../authSlice';

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2 style={{ color: '#00ffcc', textShadow: '0 0 10px #00ffcc, 0 0 20px #ff00ff' }}>Bienvenido, {user?.name || user?.email}!</h2>
      <button onClick={() => dispatch(logout())} style={{ marginTop: '2rem' }}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;