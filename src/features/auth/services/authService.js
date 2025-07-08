const API_URL = 'https://api.escuelajs.co/api/v1';

export const authenticateUser = async (credentials) => {
  const { email, password } = credentials;
  // Usuario admin local
  if ((email === 'Juanzzo' || email === 'juanzzo' || email === 'juanzzo@mail.com') && password === 'admin123') {
    return { email: 'Juanzzo', role: 'admin', name: 'Juanzzo' };
  }
  // Usuarios de la API externa
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Error al conectar con el servidor');
  }
  const users = await response.json();
  const user = users.find(u => u.email === email && password === 'changeme');
  if (!user) {
    throw new Error('Credenciales incorrectas');
  }
  return user;
};