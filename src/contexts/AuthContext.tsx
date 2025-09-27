import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('threatlab_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would call the API
    if (email === 'admin@gmail.com' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        username: 'admin',
        email: 'admin@gmail.com',
        isAdmin: true
      };
      setUser(adminUser);
      localStorage.setItem('threatlab_user', JSON.stringify(adminUser));
      return true;
    } else if (email === 'user@example.com' && password === 'password') {
      const normalUser: User = {
        id: '2',
        username: 'user',
        email: 'user@example.com',
        isAdmin: false
      };
      setUser(normalUser);
      localStorage.setItem('threatlab_user', JSON.stringify(normalUser));
      return true;
    }
    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // Mock registration - in production, this would call the API
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      isAdmin: false
    };
    setUser(newUser);
    localStorage.setItem('threatlab_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('threatlab_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};