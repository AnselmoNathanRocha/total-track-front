import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from "react";
  
  interface WebSocketContextType {
    socket: WebSocket | null;
    sendMessage: (message: string) => void;
  }
  
  interface Props {
    children: ReactNode;
  }
  
  const WebSocketContext = createContext<WebSocketContextType | undefined>(
    undefined
  );
  
  export const WebSocketProvider = ({ children }: Props) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
  
    useEffect(() => {
      const userId = localStorage.getItem("userId"); // Ou pegue de onde for necessário
      if (userId) {
        const ws = new WebSocket(`ws://localhost:3000`, [userId]);
  
        ws.onopen = () => {
          console.log("WebSocket conectado");
        };
  
        ws.onerror = (error) => {
          console.error("Erro no WebSocket:", error);
        };
  
        ws.onclose = () => {
          console.log("WebSocket desconectado");
        };
  
        setSocket(ws);
  
        return () => {
          ws.close();
        };
      }
    }, []);
  
    const sendMessage = (message: string) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      } else {
        console.error("WebSocket não está conectado");
      }
    };
  
    return (
      <WebSocketContext.Provider value={{ socket, sendMessage }}>
        {children} {/* Retorna os filhos dentro do contexto */}
      </WebSocketContext.Provider>
    );
  };
  
  export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (!context) {
      throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
  };
  