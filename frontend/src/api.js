import axios from 'axios';

// Todas as requisicoes utilizando esse const api vai ser feito na porta 8000.
const api = axios.create({
  baseURL: "http://localhost:8000"
});

export default api;