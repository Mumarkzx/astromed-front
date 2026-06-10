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
  const [editandoId, setEditandoId] = useState<number | null>(null); // NOVO: Controle de edição

  useEffect(() => {
    carregarUsuarios();
  }, []);

  function carregarUsuarios() {
    api.get('/usuarios')
      .then(dados => setUsuarios(dados))
      .catch(error => console.error("Erro ao buscar usuários:", error));
  }


  function salvarUsuario(e: any) {
    e.preventDefault();
    setSalvando(true);
    
    const payload = { nome, email, funcao };

    if (editandoId) {
  
      api.put(`/usuarios/${editandoId}`, payload)
        .then(() => {
          alert("Tripulante atualizado com sucesso!");
          finalizarAcao();
        })
        .catch(error => console.error("Erro ao atualizar:", error))
        .finally(() => setSalvando(false));
    } else {

      api.post('/usuarios', payload)
        .then(() => {
          alert("Tripulante cadastrado com sucesso!");
          finalizarAcao();
        })
        .catch(error => console.error("Erro ao cadastrar:", error))
        .finally(() => setSalvando(false));
    }
  }

  function deletarUsuario(id: number) {
    if (window.confirm("Atenção: Tem certeza que deseja excluir este tripulante permanentemente?")) {
      api.delete(`/usuarios/${id}`)
        .then(() => {
          alert("Tripulante excluído.");
          carregarUsuarios();
        })
        .catch(error => console.error("Erro ao excluir:", error));
    }
  }


  function prepararEdicao(usuario: Usuario) {
    setEditandoId(usuario.id);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setFuncao(usuario.funcao);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }


  function finalizarAcao() {
    carregarUsuarios();
    setNome('');
    setEmail('');
    setFuncao('');
    setEditandoId(null);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">👨‍🚀 Gestão de Tripulação</h2>
        <p className="text-slate-500 mt-2">Cadastro e monitoramento do quadro de especialistas e comandantes (CRUD Completo).</p>
      </div>
      
      <div className={`p-6 rounded-xl shadow-sm border mb-10 transition-colors ${editandoId ? 'bg-blue-50 border-blue-300' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-slate-700">
            {editandoId ? `✏️ Editando Tripulante #${editandoId}` : '➕ Adicionar Novo Integrante'}
          </h3>
          {editandoId && (
            <button type="button" onClick={finalizarAcao} className="text-sm text-slate-500 hover:text-slate-700 underline">
              Cancelar Edição
            </button>
          )}
        </div>

        <form onSubmit={salvarUsuario} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-600 mb-1">Nome Completo</label>
            <input type="text" placeholder="Nome oficial" value={nome} onChange={(e: any) => setNome(e.target.value)} required 
              className="p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-600 mb-1">E-mail Corporativo</label>
            <input type="email" placeholder="nome@astromed.com" value={email} onChange={(e: any) => setEmail(e.target.value)} required 
              className="p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-600 mb-1">Função Operacional</label>
            <select value={funcao} onChange={(e: any) => setFuncao(e.target.value)} required 
              className="p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all">
              <option value="" disabled>Selecione...</option>
              <option value="Comandante">Comandante</option>
              <option value="Engenheiro">Engenheiro</option>
              <option value="Oficial Médico">Oficial Médico</option>
              <option value="Especialista">Especialista</option>
            </select>
          </div>
          <button type="submit" disabled={salvando} 
            className={`font-bold py-2.5 px-4 rounded-lg transition-colors shadow-sm h-[46px] text-white flex justify-center items-center
              ${salvando ? 'bg-slate-400' : editandoId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-800 hover:bg-slate-900'}`}>
            {salvando ? 'Processando...' : editandoId ? 'Atualizar Dados' : 'Salvar Tripulante'}
          </button>
        </form>
      </div>

      {usuarios.length === 0 ? (
        <div className="bg-slate-50 text-slate-500 p-6 rounded-xl border border-dashed text-center">
          Nenhum tripulante cadastrado no sistema.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl shadow-sm border border-slate-200 bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b text-sm uppercase tracking-wider">
                <th className="p-4 font-bold">ID</th>
                <th className="p-4 font-bold">Nome</th>
                <th className="p-4 font-bold">E-mail</th>
                <th className="p-4 font-bold">Função</th>
                <th className="p-4 font-bold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usuarios.map(usuario => (
                <tr key={usuario.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-sm text-slate-400">#{usuario.id}</td>
                  <td className="p-4 font-medium text-slate-800">{usuario.nome}</td>
                  <td className="p-4 text-slate-600">{usuario.email}</td>
                  <td className="p-4 font-semibold text-blue-600">{usuario.funcao}</td>
                  <td className="p-4 flex justify-center gap-2">
                    {/* Botão de Editar (PUT) */}
                    <button onClick={() => prepararEdicao(usuario)} className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-semibold hover:bg-blue-200 transition">
                      Editar
                    </button>

                    <button onClick={() => deletarUsuario(usuario.id)} className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-semibold hover:bg-red-200 transition">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Usuarios;