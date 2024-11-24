/* eslint-disable @typescript-eslint/no-explicit-any */
export const createWebSocket = (
  userId: string,
  onMessage: (message: any) => void
) => {
  const ws = new WebSocket(`ws://localhost:3000`, [userId]);

  ws.onopen = () => {
    console.log("WebSocket conectado");
  };

  ws.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      onMessage(message); // Chama a função de callback passando a mensagem
    } catch (error) {
      console.error("Erro ao processar mensagem do WebSocket:", error);
    }
  };

  ws.onerror = (error) => {
    console.error("Erro no WebSocket:", error);
  };

  ws.onclose = () => {
    console.log("WebSocket desconectado");
  };

  return ws; // Retorna a instância do WebSocket para que possa ser fechado posteriormente
};

export const closeWebSocket = (ws: WebSocket) => {
  ws.close();
};
