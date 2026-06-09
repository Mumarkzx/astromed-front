import { useState, useEffect } from 'react';
import api from '../services/api';

function Missoes() {
  const [missoes, setMissoes] = useState([]);
  const [nome, setNome] = useState('');
  const [destino, setDestino] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    carregarMissoes();
  }, []);

  function carregarMissoes() {
    api.get('/missoes')
      .then(response => setMissoes(response.data))
      .catch(error => console.error("Erro ao buscar missões:", error));
  }

  function cadastrarMissao(e) {
    e.preventDefault();
    const novaMissao = { nome, destino, status };

    api.post('/missoes', novaMissao)
      .then(() => {
        alert("Missão cadastrada com sucesso!");
        carregarMissoes();
        setNome('');
        setDestino('');
        setStatus('');
      })
      .catch(error => {
        console.error("Erro ao cadastrar missão:", error);
        alert("Erro ao cadastrar.");
      });
  }

  return (
    <div className="container">
      <h2>🌌 Painel de Missões Astromed</h2>

      <div className="form-container">
        <h3>Cadastrar Nova Missão</h3>
        <form onSubmit={cadastrarMissao}>
          <input 
            type="text" 
            placeholder="Nome da Missão (ex: Apollo 20)" 
            className="input-field"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required 
          />
          <input 
            type="text" 
            placeholder="Destino (ex: Marte)" 
            className="input-field"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            required 
          />
          <select 
            className="input-field" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="" disabled>Selecione o Status</option>
            <option value="Planejada">Planejada</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluída">Concluída</option>
          </select>
          <button type="submit" className="btn-submit">Salvar Missão</button>
        </form>
      </div>
      
      {missoes.length === 0 ? (
        <p>Nenhuma missão cadastrada ainda. O banco de dados está zerado!</p>
      ) : (
        <table className="table-missoes">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome da Missão</th>
              <th>Destino</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {missoes.map(missao => (
              <tr key={missao.id}>
                <td>{missao.id}</td>
                <td>{missao.nome}</td>
                <td>{missao.destino}</td>
                <td>{missao.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Missoes;