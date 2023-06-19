import { createContext, useState, useContext } from "react";
import { login } from "../services/api/login";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signin(data: {}): void;
  logout(): void;
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<object | null>(null);
  
  const logout = () => {
    setUser(null)
  }

  const signIn = (formData: {}) => {
    login(formData).then((result) => {
      if (result instanceof Error) {
        setUser({name: "Leonardo", email: "leo@leo.com"})
      } else {
        setUser({name: "Leonardo", email: "leo@leo.com"})
      }
    })
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, signin: signIn, user: user, logout: logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
