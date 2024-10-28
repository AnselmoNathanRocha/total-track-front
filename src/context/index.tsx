import dayjs from "dayjs";
import { useState, createContext, useContext, useEffect } from "react";

interface DataProps {
  token: string;
}

type AuthContextProps = {
  token: string | null;
  login: (data: DataProps) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedExpiresAt = localStorage.getItem("expiresAt");

    if (storedToken && storedExpiresAt) {
      const isExpired = dayjs().isAfter(dayjs(storedExpiresAt));

      if (isExpired) {
        logout();
      } else {
        setToken(storedToken);
      }
    }
  }, []);

  const login = (data: DataProps) => {
    setToken(data.token);

    const expiresAt = dayjs().add(1, "day").toISOString();

    localStorage.setItem("authToken", data.token);
    localStorage.setItem("expiresAt", expiresAt);
    window.location.reload();
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("expiresAt");

    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth, AuthContext };
