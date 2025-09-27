import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Eye, EyeOff, Shield, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (pass: string) => {
    const requirements = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /\d/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass)
    };
    return requirements;
  };

  const passwordReqs = validatePassword(password);
  const isPasswordValid = Object.values(passwordReqs).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isPasswordValid) {
      setError('Password does not meet security requirements');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      setError('You must accept the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const success = await register(username, email, password);
      if (success) {
        navigate('/tools');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
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
              Join ThreatLab
            </h1>
            <p className="text-cyber-gray-300">
              Create your account and start learning cybersecurity
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-cyber-red/20 border border-cyber-red/50 rounded-lg p-3 text-cyber-red text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-cyber-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-cyber-dark border border-cyber-cyan/30 rounded-lg text-cyber-gray-100 placeholder-cyber-gray-500 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-cyber-cyan transition-colors"
                placeholder="Choose a username"
              />
            </div>

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
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-gray-400 hover:text-cyber-cyan transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              {password && (
                <div className="mt-3 space-y-1">
                  <p className="text-xs text-cyber-gray-400">Password must contain:</p>
                  {Object.entries({
                    'At least 8 characters': passwordReqs.length,
                    'One uppercase letter': passwordReqs.uppercase,
                    'One lowercase letter': passwordReqs.lowercase,
                    'One number': passwordReqs.number,
                    'One special character': passwordReqs.special
                  }).map(([requirement, met]) => (
                    <div key={requirement} className="flex items-center space-x-2 text-xs">
                      <Check className={`h-3 w-3 ${met ? 'text-cyber-green' : 'text-cyber-gray-500'}`} />
                      <span className={met ? 'text-cyber-green' : 'text-cyber-gray-400'}>
                        {requirement}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-cyber-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-cyber-dark border border-cyber-cyan/30 rounded-lg text-cyber-gray-100 placeholder-cyber-gray-500 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:border-cyber-cyan transition-colors pr-12"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-gray-400 hover:text-cyber-cyan transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                id="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 h-4 w-4 bg-cyber-dark border border-cyber-cyan/30 rounded focus:ring-2 focus:ring-cyber-cyan"
              />
              <label htmlFor="terms" className="text-sm text-cyber-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="text-cyber-cyan hover:text-cyber-cyan/80 transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-cyber-cyan hover:text-cyber-cyan/80 transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !isPasswordValid || password !== confirmPassword || !acceptTerms}
              className="w-full flex items-center justify-center px-4 py-3 bg-cyber-cyan text-cyber-dark font-medium rounded-lg hover:bg-cyber-cyan/90 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2 focus:ring-offset-cyber-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed space-x-2"
            >
              <UserPlus className="h-5 w-5" />
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-cyber-gray-400 text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-cyber-cyan hover:text-cyber-cyan/80 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-cyber-navy/30 border border-cyber-cyan/20 rounded-lg p-4">
          <p className="text-cyber-gray-400 text-xs text-center">
            This is a demo environment. In production, all user data 
            would be encrypted and stored securely.
          </p>
        </div>
      </div>
    </div>
  );
};