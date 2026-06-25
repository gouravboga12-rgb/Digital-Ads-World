import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, User, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin/dashboard');
      } else {
        // Fallback for visual mock testing (login with admin / admin12345)
        if (username === 'admin' && password === 'admin12345') {
          localStorage.setItem('admin_token', 'mock_token_12345');
          navigate('/admin/dashboard');
        } else {
          setError(data.message || 'Invalid username or password credentials');
        }
      }
    } catch (err) {
      // Local fallback for offline visual review
      if (username === 'admin' && password === 'admin12345') {
        localStorage.setItem('admin_token', 'mock_token_12345');
        navigate('/admin/dashboard');
      } else {
        setError('Connection failed. Try default credentials: admin / admin12345');
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 md:p-10 flex flex-col gap-6 text-left" data-aos="zoom-in">
        
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-50 text-primary-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={22} />
          </div>
          <h1 className="text-2xl font-black text-premium-black font-heading">
            Admin Console Login
          </h1>
          <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">Authorized agency access only</p>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs flex gap-2 items-center font-semibold">
            <ShieldAlert size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <User size={16} />
              </span>
              <input
                type="text"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/15 flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <span>Authenticate Login</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="text-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Demo Credentials: admin / admin12345
          </span>
        </div>

      </div>
    </div>
  );
}
