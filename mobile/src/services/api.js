import axios from 'axios';

const api = axios.create({
  // parte da url que vai ser mantida em todas as chamadas
  // e padrão em todas as chamadas
  baseURL: 'http://192.168.0.103:3333',
})

export default api;