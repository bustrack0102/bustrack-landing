import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AuthResult, UserSession } from '../models/auth';
import {
  loadStoredSession,
  loginWithApi,
  logoutFromApi,
  deleteAccountFromApi,
} from '../services/authService';

interface AuthContextValue {
  session: UserSession | null;
  isAuthenticated: boolean;
  login: (userName: string, credentialInput: string, rememberMe: boolean) => Promise<AuthResult>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession | null>(() => loadStoredSession());

  const login = useCallback(
    async (userName: string, credentialInput: string, rememberMe: boolean): Promise<AuthResult> => {
      const result = await loginWithApi(userName, credentialInput, rememberMe);
      if (result.succeeded && result.session) {
        setSession(result.session);
      }
      return result;
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    const activeBearer = session?.bearerValue;
    setSession(null);
    await logoutFromApi(activeBearer);
  }, [session]);

  const deleteAccount = useCallback(async (): Promise<boolean> => {
    const activeBearer = session?.bearerValue;
    const deleted = await deleteAccountFromApi(activeBearer);
    if (deleted) {
      setSession(null);
    }
    return deleted;
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: Boolean(session),
        login,
        logout,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe utilizarse dentro de un AuthProvider');
  }
  return ctx;
}
