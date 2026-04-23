import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/tools', label: 'Tools' },
    { path: '/about', label: 'About' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-cyber-navy/70 backdrop-blur-xl border-b border-cyber-cyan/20 shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group perspective-1000">
            <div className="p-2 bg-cyber-cyan/10 rounded-lg border border-cyber-cyan/20 group-hover:bg-cyber-cyan/20 group-hover:-translate-y-0.5 group-hover:rotate-3 transition-all duration-300">
              <Shield className="h-6 w-6 text-cyber-cyan group-hover:animate-pulse" />
            </div>
            <span className="text-xl font-bold cyber-gradient-text font-mono">ThreatLab</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                  isActive(item.path)
                    ? 'text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/40 shadow-[0_0_18px_rgba(0,255,255,0.18)]'
                    : 'text-cyber-gray-300 hover:text-cyber-cyan hover:bg-cyber-cyan/10 border border-transparent hover:border-cyber-cyan/20'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      isActive('/admin')
                        ? 'text-cyber-magenta bg-cyber-magenta/10 border border-cyber-magenta/40 shadow-[0_0_18px_rgba(255,0,208,0.2)]'
                        : 'text-cyber-gray-300 hover:text-cyber-magenta hover:bg-cyber-magenta/10 border border-transparent hover:border-cyber-magenta/20'
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2 text-cyber-gray-300">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user?.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-cyber-gray-300 hover:text-cyber-red hover:bg-cyber-red/10 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-cyber-gray-300 hover:text-cyber-cyan transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan rounded-md hover:bg-cyber-cyan hover:text-cyber-dark transition-all duration-300 hover:-translate-y-0.5 cyber-button"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-cyber-gray-300 hover:text-cyber-cyan transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-cyber-navy/95 backdrop-blur-md border-t border-cyber-cyan/20 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 text-base font-medium ${
                  isActive(item.path)
                    ? 'text-cyber-cyan bg-cyber-cyan/10'
                    : 'text-cyber-gray-300 hover:text-cyber-cyan hover:bg-cyber-cyan/5'
                } rounded-md transition-colors`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 text-base font-medium text-cyber-magenta hover:bg-cyber-magenta/10 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <div className="px-3 py-2 text-cyber-gray-300">
                  Welcome, {user?.username}
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-cyber-red hover:bg-cyber-red/10 rounded-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-cyber-gray-300 hover:text-cyber-cyan hover:bg-cyber-cyan/5 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-base font-medium text-cyber-cyan hover:bg-cyber-cyan/10 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
      </div>
    </nav>
  );
};