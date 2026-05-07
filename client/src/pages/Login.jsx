import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new URLSearchParams();
    formData.append('username', email); // OAuth2 expects 'username'
    formData.append('password', password);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      login(data.access_token, data.role);
      navigate('/blog');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 glass rounded-2xl border border-matrix-400/[0.06]">
      <h2 className="text-2xl font-bold font-display text-white mb-6">Login to ReconShield</h2>
      {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-surface-900 border border-matrix-400/[0.1] rounded-lg px-4 py-2 text-white focus:border-matrix-400 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-surface-900 border border-matrix-400/[0.1] rounded-lg px-4 py-2 text-white focus:border-matrix-400 focus:outline-none transition-colors"
          />
        </div>
        <button
          type="submit"
          className="mt-2 w-full py-2 bg-matrix-400/10 text-matrix-400 border border-matrix-400/20 rounded-lg hover:bg-matrix-400/20 transition-colors font-medium"
        >
          Login
        </button>
      </form>
    </div>
  );
}
