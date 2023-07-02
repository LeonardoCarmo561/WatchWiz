import { createContext, useState, useContext, useCallback, useEffect } from "react";
import { useStorageContext } from "./StorageContext";

interface UserData {
  access_token: string;
  refresh_token: string;
}

interface AuthContextData {
  logout(): void;
  signed: boolean;
  user: UserData | null;
  setUser(data: UserData): void;
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);

  const { storage } = useStorageContext()

  const logout = () => {
    setUser(null)
    storage.delete("access_token")
    storage.delete("refresh_token")
  }

  const handleSetUser = useCallback((data: UserData) => {
    setUser(data)
  }, [])

  useEffect(() => {
    const accessToken = storage.getString("access_token")
    const refreshToken = storage.getString("refresh_token")

    if (accessToken && refreshToken) {
      setUser({
        access_token: accessToken,
        refresh_token: refreshToken
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ signed: !!user, user: user, setUser: handleSetUser, logout: logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
