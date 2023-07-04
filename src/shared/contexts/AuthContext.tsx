import { createContext, useState, useContext, useCallback, useEffect } from "react";
import { useStorageContext } from "./StorageContext";
import { refreshAccessToken } from "../services/api/login";

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
    const refreshToken = storage.getString("refresh_token")

    if (refreshToken) {
      refreshAccessToken(refreshToken)
      .then((result)  => {
        if (result instanceof Error) {
          setUser(null)
        } else {
          setUser({
            access_token: result.access_token,
            refresh_token: result.refresh_token
          })
          storage.set("access_token", result.access_token)
          storage.set("refresh_token", result.refresh_token)
        }
      })
    } else {
      logout()
    }
  }, [])

  useEffect(() => {
    let interval = setInterval(() => {
      const refreshToken = storage.getString("refresh_token")

      if (refreshToken) {
        refreshAccessToken(refreshToken)
        .then((result) => {
          if (result instanceof Error) {
            alert("Faça login!")
            logout()
          } else {
            setUser({
              access_token: result.access_token,
              refresh_token: result.access_token
            })
            storage.set("access_token", result.access_token)
            storage.set("refresh_token", result.refresh_token)
          }
        })
      } else {
        logout()
      }
    }, Number(60 * 60 * 6 * 900));

    return () => clearInterval(interval);
  });

  return (
    <AuthContext.Provider value={{ signed: !!user, user: user, setUser: handleSetUser, logout: logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
