import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the backend returns a token in the response body, e.g., { token: '...' }
        localStorage.setItem('token', data.token);
        // You might also want to store user info if returned
        // localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/admin'); // Navigate to admin panel on success
      } else {
        // Handle backend errors (e.g., invalid credentials)
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-50">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Login</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label htmlFor="username" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white"
                placeholder="Enter your username"
              />
            </div>

            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white"
                placeholder="Enter your password"
              />
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full px-8 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-lg hover:shadow-xl"
              >
                Login
              </button>

              <Link
                to="/"
                className="block w-full px-8 py-4 bg-white text-blue-600 font-medium rounded-xl border border-blue-200 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-lg hover:shadow-xl text-center"
              >
                Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login; 