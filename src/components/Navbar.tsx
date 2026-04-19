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
    <nav className="fixed top-0 w-full z-50 bg-cyber-navy/90 backdrop-blur-md border-b border-cyber-cyan/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-cyber-cyan/10 rounded-lg group-hover:bg-cyber-cyan/20 transition-colors">
              <Shield className="h-6 w-6 text-cyber-cyan" />
            </div>
            <span className="text-xl font-bold text-cyber-cyan font-mono">ThreatLab</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-cyber-cyan border-b-2 border-cyber-cyan'
                    : 'text-cyber-gray-300 hover:text-cyber-cyan hover:bg-cyber-cyan/10'
                } rounded-t-md`}
              >
                {item.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      isActive('/admin')
                        ? 'text-cyber-magenta border-b-2 border-cyber-magenta'
                        : 'text-cyber-gray-300 hover:text-cyber-magenta hover:bg-cyber-magenta/10'
                    } rounded-t-md`}
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
                  className="p-2 text-cyber-gray-300 hover:text-cyber-red hover:bg-cyber-red/10 rounded-lg transition-colors"
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
                  className="px-4 py-2 text-sm font-medium bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan rounded-md hover:bg-cyber-cyan hover:text-cyber-dark transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-cyber-gray-300 hover:text-cyber-cyan"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-cyber-navy/95 backdrop-blur-md border-t border-cyber-cyan/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 text-base font-medium ${
                  isActive(item.path)
                    ? 'text-cyber-cyan bg-cyber-cyan/10'
                    : 'text-cyber-gray-300 hover:text-cyber-cyan hover:bg-cyber-cyan/5'
                } rounded-md`}
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
                  className="block w-full text-left px-3 py-2 text-base font-medium text-cyber-red hover:bg-cyber-red/10 rounded-md"
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
      )}
    </nav>
  );
};