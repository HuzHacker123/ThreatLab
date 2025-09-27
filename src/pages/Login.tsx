import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/tools');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-md w-full mx-4">
        <div className="bg-cyber-navy/50 border border-cyber-cyan/20 rounded-xl p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-cyber-cyan/10 rounded-full mb-4">
              <Shield className="h-8 w-8 text-cyber-cyan" />
            </div>
            <h1 className="text-3xl font-bold text-cyber-cyan mb-2 font-mono">
              Welcome Back
            </h1>
            <p className="text-cyber-gray-300">
              Sign in to access your ThreatLab dashboard
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="bg-cyber-blue/20 border border-cyber-cyan/30 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-cyber-cyan mb-2">Demo Credentials:</h3>
            <div className="text-xs text-cyber-gray-300 space-y-1">
              {/* <p><span className="font-mono">admin@gmail.com</span> / <span className="font-mono">admin123</span> (Admin)</p> */}
              <p><span className="font-mono">user@example.com</span> / <span className="font-mono">password</span> (User)</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-cyber-red/20 border border-cyber-red/50 rounded-lg p-3 text-cyber-red text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cyber-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-cyber-dark border border-cyber-cyan/30 rounded-lg text-cyber-gray-100 placeholder-cyber-gray-500 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-cyber-cyan transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cyber-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-cyan/30 rounded-lg text-cyber-gray-100 placeholder-cyber-gray-500 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-cyber-cyan transition-colors pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-gray-400 hover:text-cyber-cyan transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 bg-cyber-cyan text-cyber-dark font-medium rounded-lg hover:bg-cyber-cyan/90 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2 focus:ring-offset-cyber-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed space-x-2"
            >
              <LogIn className="h-5 w-5" />
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-cyber-gray-400 text-sm">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-cyber-cyan hover:text-cyber-cyan/80 font-medium transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-cyber-navy/30 border border-cyber-cyan/20 rounded-lg p-4">
          <p className="text-cyber-gray-400 text-xs text-center">
            This is a demo environment. In production, all authentication 
            would be secured with proper encryption and security measures.
          </p>
        </div>
      </div>
    </div>
  );
};