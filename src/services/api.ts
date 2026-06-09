const BASE_URL = 'https://astromed-api.onrender.com';

const api = {
  get: async (endpoint: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    return response.json();
  },
  
  post: async (endpoint: string, data: any): Promise<any> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    try {
      return await response.json();
    } catch (e) {
      return null; 
    }
  }
};

export default api;