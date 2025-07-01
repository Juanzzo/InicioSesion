const API_URL = 'https://api.escuelajs.co/api/v1';

export const authenticateUser = async (credentials) => {
  const { email, password } = credentials;
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