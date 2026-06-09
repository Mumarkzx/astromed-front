import { useState, useEffect } from 'react';
import api from '../services/api';

interface Usuario {
  id: number;
  nome: string;
  email: string;
  funcao: string;
}

function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [funcao, setFuncao] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  function carregarUsuarios() {
    api.get('/usuarios')
      .then(dados => setUsuarios(dados))
      .catch(error => console.error("Erro ao buscar usuários:", error));
  }

  // O "any" salvando a madrugada novamente
  function cadastrarUsuario(e: any) {
    e.preventDefault();
    setSalvando(true);
    
    const novoUsuario = { nome: nome, email: email, funcao: funcao };

    api.post('/usuarios', novoUsuario)
      .then(() => {
        alert("Tripulante cadastrado com sucesso!");
        carregarUsuarios();
        setNome('');
        setEmail('');
        setFuncao('');
      })
      .catch(error => console.error("Erro ao cadastrar usuário:", error))
      .finally(() => {
        setSalvando(false);
      });
  }

  return (
    <div className="container">
      <h2>👨‍🚀 Gestão de Tripulação (Usuários)</h2>
      <div className="form-container">
        <h3>Cadastrar Novo Tripulante</h3>
        <form onSubmit={cadastrarUsuario}>
          <input type="text" placeholder="Nome Completo" className="input-field" value={nome} onChange={(e: any) => setNome(e.target.value)} required />
          <input type="email" placeholder="E-mail oficial" className="input-field" value={email} onChange={(e: any) => setEmail(e.target.value)} required />
          <select className="input-field" value={funcao} onChange={(e: any) => setFuncao(e.target.value)} required>
            <option value="" disabled>Selecione a Função</option>
            <option value="Comandante">Comandante</option>
            <option value="Engenheiro">Engenheiro</option>
            <option value="Oficial Médico">Oficial Médico</option>
            <option value="Especialista">Especialista</option>
          </select>
          <button 
            type="submit" 
            className="btn-submit" 
            disabled={salvando}
            style={{ opacity: salvando ? 0.7 : 1, cursor: salvando ? 'not-allowed' : 'pointer' }}
          >
            {salvando ? 'Salvando Tripulante na Nuvem...' : 'Salvar Tripulante'}
          </button>
        </form>
      </div>
      {usuarios.length === 0 ? (
        <p>Nenhum tripulante cadastrado no sistema.</p>
      ) : (
        <table className="table-missoes">
          <thead><tr><th>ID</th><th>Nome</th><th>E-mail</th><th>Função</th></tr></thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.id}><td>{usuario.id}</td><td>{usuario.nome}</td><td>{usuario.email}</td><td>{usuario.funcao}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Usuarios;