import dayjs from "dayjs";
import { useState, createContext, useContext, useEffect } from "react";

interface DataProps {
  userId: number;
  token: string;
}

type AuthContextProps = {
  token: string | null;
  idUser: number | null;
  login: (data: DataProps) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [idUser, setIdUser] = useState<number | null>(null);

  useEffect(() => {
    const idUser = localStorage.getItem("ID");
    const storedToken = localStorage.getItem("authToken");
    const storedExpiresAt = localStorage.getItem("expiresAt");

    if (storedToken && storedExpiresAt) {
      const isExpired = dayjs().isAfter(dayjs(storedExpiresAt));

      if (isExpired) {
        logout();
      } else {
        setToken(storedToken);
        setIdUser(Number(idUser));
      }
    }
  }, []);

  const login = (data: DataProps) => {
    setToken(data.token);
    setIdUser(data.userId);

    const expiresAt = dayjs().add(1, "month").toISOString();

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
        idUser,
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
