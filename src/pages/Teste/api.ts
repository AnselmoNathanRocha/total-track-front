import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // Altere para a URL do seu backend, se necessário
});

export default api;
