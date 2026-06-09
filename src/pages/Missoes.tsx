import { useState, useEffect } from 'react';
import api from '../services/api';

interface Missao {
  id: number;
  nomeMissao: string;
  destino: string;
  status: string;
}

function Missoes() {
  const [missoes, setMissoes] = useState<Missao[]>([]);
  const [nome, setNome] = useState('');
  const [destino, setDestino] = useState('');
  const [status, setStatus] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    carregarMissoes();
  }, []);

  function carregarMissoes() {
    api.get('/missoes')
      .then(dados => setMissoes(dados))
      .catch(error => console.error("Erro ao buscar missões:", error));
  }

  function salvarMissao(e: any) {
    e.preventDefault();
    setSalvando(true);
    const payload = { nomeMissao: nome, destino, status };

    if (editandoId) {
      api.put(`/missoes/${editandoId}`, payload)
        .then(() => {
          alert("Missão atualizada com sucesso!");
          finalizarAcao();
        })
        .catch(error => console.error("Erro ao atualizar missão:", error))
        .finally(() => setSalvando(false));
    } else {
      api.post('/missoes', payload)
        .then(() => {
          alert("Missão orquestrada com sucesso!");
          finalizarAcao(); 
        })
        .catch(error => console.error("Erro ao cadastrar missão:", error))
        .finally(() => setSalvando(false));
    }
  }

  function deletarMissao(id: number) {
    if (window.confirm("Alerta: Tem certeza que deseja abortar e excluir esta missão permanentemente?")) {
      api.delete(`/missoes/${id}`)
        .then(() => {
          alert("Registro da missão apagado.");
          carregarMissoes();
        })
        .catch(error => console.error("Erro ao excluir:", error));
    }
  }

  function prepararEdicao(missao: Missao) {
    setEditandoId(missao.id);
    setNome(missao.nomeMissao);
    setDestino(missao.destino);
    setStatus(missao.status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function finalizarAcao() {
    carregarMissoes();
    setNome('');
    setDestino('');
    setStatus('');
    setEditandoId(null);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">🌌 Logística de Missões</h2>
        <p className="text-slate-500 mt-2">Controle operacional e rastreamento de lançamentos (CRUD Completo).</p>
      </div>
      
      {/* O fundo agora fica azul claro na edição, igual à página de Tripulação */}
      <div className={`p-6 rounded-xl shadow-sm border mb-10 transition-colors ${editandoId ? 'bg-blue-50 border-blue-300' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-slate-700">
            {editandoId ? `✏️ Reprogramando Missão MSN-${editandoId}` : '🚀 Planejar Nova Missão'}
          </h3>
          {editandoId && (
            <button type="button" onClick={finalizarAcao} className="text-sm text-slate-500 hover:text-slate-700 underline">
              Cancelar Edição
            </button>
          )}
        </div>

        <form onSubmit={salvarMissao} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-600 mb-1">Identificação da Missão</label>
            <input type="text" placeholder="ex: Apollo 20" value={nome} onChange={(e: any) => setNome(e.target.value)} required 
              className="p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-600 mb-1">Destino Alvo</label>
            <input type="text" placeholder="ex: Órbita Lunar" value={destino} onChange={(e: any) => setDestino(e.target.value)} required 
              className="p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-600 mb-1">Status Operacional</label>
            <select value={status} onChange={(e: any) => setStatus(e.target.value)} required 
              className="p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all">
              <option value="" disabled>Selecione...</option>
              <option value="Planejada">Planejada</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluída">Concluída</option>
            </select>
          </div>
          <button type="submit" disabled={salvando}
            className={`font-bold py-2.5 px-4 rounded-lg transition-colors shadow-sm h-[46px] text-white flex justify-center items-center
              ${salvando ? 'bg-slate-400' : editandoId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-800 hover:bg-slate-900'}`}>
            {salvando ? 'Processando...' : editandoId ? 'Salvar Alterações' : 'Salvar Missão'}
          </button>
        </form>
      </div>

      {missoes.length === 0 ? (
        <div className="bg-slate-50 text-slate-500 p-6 rounded-xl border border-dashed text-center">
          Nenhuma missão registada nos servidores operacionais.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl shadow-sm border border-slate-200 bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b text-sm uppercase tracking-wider">
                <th className="p-4 font-bold">Registo</th>
                <th className="p-4 font-bold">Missão</th>
                <th className="p-4 font-bold">Destino</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {missoes.map(missao => (
                <tr key={missao.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-sm text-slate-400">MSN-{missao.id}</td>
                  <td className="p-4 font-bold text-slate-800">{missao.nomeMissao}</td>
                  <td className="p-4 text-slate-600">{missao.destino}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                      ${missao.status === 'Concluída' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 
                        missao.status === 'Em Andamento' ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                        'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {missao.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    {/* Botão de Editar agora na cor azul */}
                    <button onClick={() => prepararEdicao(missao)} className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-semibold hover:bg-blue-200 transition">
                      Editar
                    </button>
                    <button onClick={() => deletarMissao(missao.id)} className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-semibold hover:bg-red-200 transition">
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

export default Missoes;