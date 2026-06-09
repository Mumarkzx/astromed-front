// Coloque aqui a URL e a porta onde o seu Java/Quarkus está rodando
const BASE_URL = 'http://localhost:8080'; 

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

  // NOVO: Método PUT (Atualizar) adicionado para o professor
  put: async (endpoint: string, data: any) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error("Erro no PUT");
    return response.json();
  },

  // NOVO: Método DELETE (Excluir) adicionado para o professor
  delete: async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE'
    });
    // Alguns deletes do Java retornam vazio (204 No Content), então tratamos isso
    if (response.status === 204) return; 
    if (!response.ok) throw new Error("Erro no DELETE");
    return response.json();
  }
};

export default api;