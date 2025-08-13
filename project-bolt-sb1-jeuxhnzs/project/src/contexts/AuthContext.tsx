import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
  lastLogin?: Date;
  isBlocked?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loginAttempts: number;
  resetAttempts: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Mock users database
  const [users] = useState<User[]>([
    {
      id: '1',
      email: 'admin@amazon.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date(),
      lastLogin: new Date(),
    },
    {
      id: '2',
      email: 'user@amazon.com',
      name: 'John Doe',
      role: 'user',
      createdAt: new Date(),
      lastLogin: new Date(),
    }
  ]);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    const attempts = localStorage.getItem('loginAttempts');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }

    if (attempts) {
      setLoginAttempts(parseInt(attempts, 10));
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);

      if (loginAttempts >= 3) {
        return { success: false, error: 'Account blocked due to too many failed attempts' };
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication logic
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem('loginAttempts', newAttempts.toString());
        return { success: false, error: 'Invalid email or password' };
      }

      // Mock password validation (in real app, this would be hashed)
      const validPassword = (email === 'admin@amazon.com' && password === 'admin123') ||
                           (email === 'user@amazon.com' && password === 'user123');

      if (!validPassword) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem('loginAttempts', newAttempts.toString());
        return { success: false, error: 'Invalid email or password' };
      }

      const updatedUser = { ...foundUser, lastLogin: new Date() };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      resetAttempts();

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return { success: false, error: 'User already exists with this email' };
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: 'user',
        createdAt: new Date(),
        lastLogin: new Date(),
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const resetAttempts = () => {
    setLoginAttempts(0);
    localStorage.removeItem('loginAttempts');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      logout, 
      loginAttempts,
      resetAttempts 
    }}>
      {children}
    </AuthContext.Provider>
  );
};