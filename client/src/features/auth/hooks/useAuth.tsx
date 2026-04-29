import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authApi } from "../api/authApi";
import type { LoginFormData, SignupFormData } from "../schemas/authSchema";
import type { User } from "../../../types";

type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (payload: LoginFormData) => Promise<void>;
  signup: (payload: SignupFormData) => Promise<void>;
  logout: () => Promise<void>;
  setAccessToken: (token: string | null) => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let inMemoryAccessToken: string | null = null;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const setAccessToken = useCallback((token: string | null) => {
    inMemoryAccessToken = token;
    setAccessTokenState(token);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const me = await authApi.me();
      setUser(me.data);
    } catch {
      setUser(null);
    }
  }, []);

  const bootstrapAuth = useCallback(async () => {
    try {
      const refreshed = await authApi.refresh();
      setAccessToken(refreshed.data.accessToken);
      const me = await authApi.me();
      setUser(me.data);
    } catch {
      setAccessToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [setAccessToken]);

  useEffect(() => {
    bootstrapAuth();
  }, [bootstrapAuth]);

  const login = useCallback(
    async (payload: LoginFormData) => {
      const result = await authApi.login(payload);
      setAccessToken(result.data.accessToken);
      setUser(result.data.user);
    },
    [setAccessToken]
  );

  const signup = useCallback(
    async (payload: SignupFormData) => {
      const result = await authApi.signup(payload);
      setAccessToken(result.data.accessToken);
      setUser(result.data.user);
    },
    [setAccessToken]
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }, [setAccessToken]);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      loading,
      login,
      signup,
      logout,
      setAccessToken,
      refreshUser,
    }),
    [user, accessToken, loading, login, signup, logout, setAccessToken, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function getAccessToken() {
  return inMemoryAccessToken;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}