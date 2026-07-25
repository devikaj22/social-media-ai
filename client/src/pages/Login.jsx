import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Mail, Lock, LogIn, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/generate';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        const rawError = res.error || 'Invalid login credentials.';
        if (rawError.toLowerCase().includes('email not confirmed')) {
          setError('Please verify your email first. Check your inbox for the confirmation link before logging in.');
        } else {
          setError(rawError);
        }
      }
    } catch (err) {
      console.error('Login Error:', err);
      const rawError = err.response?.data?.error || err.message || 'Login failed.';
      if (rawError.toLowerCase().includes('email not confirmed')) {
        setError('Please verify your email first. Check your inbox for the confirmation link before logging in.');
      } else {
        setError(rawError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">

      <div className="text-center space-y-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/25">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Log in to manage your AI Social Media Content Calendars
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">

        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-indigo-500" />
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-indigo-500" />
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-500/25 disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span>Sign In to Account</span>
            </>
          )}
        </button>

        {/* Register Link */}
        <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
          Don't have an account yet?{' '}
          <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
            Create Account
          </Link>
        </div>

      </form>

    </div>
  );
}