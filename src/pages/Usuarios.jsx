import { useState, useEffect } from 'react';
import api from '../services/api';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  
  // Estados do formulário
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [especialidade, setEspecialidade] = useState('');

  useEffect(() => {
    carregarUsuarios();
  }, []);

  function carregarUsuarios() {
    api.get('/usuarios')
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Erro ao buscar usuários:", error));
  }

  function cadastrarUsuario(e) {
    e.preventDefault();
    
    const novoUsuario = { 
      nome: nome, 
      cargo: cargo, 
      especialidade: especialidade 
    };

    api.post('/usuarios', novoUsuario)
      .then(() => {
        alert("Tripulante cadastrado com sucesso!");
        carregarUsuarios();
        setNome('');
        setCargo('');
        setEspecialidade('');
      })
      .catch(error => {
        console.error("Erro ao cadastrar usuário:", error);
        alert("Erro ao cadastrar. Verifique o console.");
      });
  }

  return (
    <div className="container">
      <h2>👨‍🚀 Gestão de Tripulação (Usuários)</h2>

      <div className="form-container">
        <h3>Cadastrar Novo Tripulante</h3>
        <form onSubmit={cadastrarUsuario}>
          <input 
            type="text" 
            placeholder="Nome Completo" 
            className="input-field"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required 
          />
          <select 
            className="input-field" 
            value={cargo} 
            onChange={(e) => setCargo(e.target.value)}
            required
          >
            <option value="" disabled>Selecione o Cargo</option>
            <option value="Comandante">Comandante</option>
            <option value="Engenheiro">Engenheiro</option>
            <option value="Oficial Médico">Oficial Médico</option>
            <option value="Especialista">Especialista</option>
          </select>
          <input 
            type="text" 
            placeholder="Especialidade (ex: Navegação, Cirurgia)" 
            className="input-field"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            required 
          />
          <button type="submit" className="btn-submit">Salvar Tripulante</button>
        </form>
      </div>
      
      {usuarios.length === 0 ? (
        <p>Nenhum tripulante cadastrado no sistema.</p>
      ) : (
        <table className="table-missoes">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Especialidade</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.cargo}</td>
                <td>{usuario.especialidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Usuarios;