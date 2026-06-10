// Coloque aqui a URL e a porta onde o seu Java/Quarkus está rodando
const BASE_URL = 'https://astromed-api.onrender.com'; 

const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error("Erro no GET");
    return response.json();
  },
  
  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error("Erro no POST");
    return response.json();
  },

  
  put: async (endpoint: string, data: any) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error("Erro no PUT");
    return response.json();
  },

 
  delete: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE'
    });
    
    if (response.status === 204) return; 
    if (!response.ok) throw new Error("Erro no DELETE");
    return response.json();
  }
};

export default api;