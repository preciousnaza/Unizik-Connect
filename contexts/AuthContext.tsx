import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types for user data
export type User = {
  name: string;
  matricNumber: string;
  faculty: string;
  department: string;
  level: string;
  email: string;
  password?: string; // stored locally for this simple example
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (u: User, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const STORAGE_USER_KEY = 'UNIZIK_USER';
const STORAGE_SESSION_KEY = 'UNIZIK_SESSION';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load session on mount
  useEffect(() => {
    (async () => {
      try {
        const sessionEmail = await AsyncStorage.getItem(STORAGE_SESSION_KEY);
        if (sessionEmail) {
          const raw = await AsyncStorage.getItem(STORAGE_USER_KEY);
          if (raw) {
            const stored: User = JSON.parse(raw);
            if (stored.email === sessionEmail) {
              setUser(stored);
            }
          }
        }
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Simple signup: save user to AsyncStorage and create session
  const signup = async (u: User, password: string) => {
    if (!u.email || !password) return { ok: false, error: 'Missing fields' };
    try {
      const toStore = { ...u, password };
      await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(toStore));
      await AsyncStorage.setItem(STORAGE_SESSION_KEY, u.email);
      setUser(toStore);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Failed to save account' };
    }
  };

  // Simple login: read stored user and compare credentials
  const login = async (email: string, password: string) => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_USER_KEY);
      if (!raw) return { ok: false, error: 'Account not found' };
      const stored: User = JSON.parse(raw);
      if (stored.email !== email || stored.password !== password) {
        return { ok: false, error: 'Invalid credentials' };
      }
      await AsyncStorage.setItem(STORAGE_SESSION_KEY, email);
      setUser(stored);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Login failed' };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming the auth context
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
