import { useState, useEffect } from 'react';
import api from '../services/api';

interface Relatorio {
  id: number;
  frequenciaCardiaca: number;
  pressaoArterial: number;
  observacoes: string;
}

export default function RelatoriosSaude() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [frequencia, setFrequencia] = useState('');
  const [pressao, setPressao] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    carregarRelatorios();
  }, []);

  function carregarRelatorios() {
    api.get('/relatorios')
      .then(dados => setRelatorios(dados))
      .catch(error => console.error("Erro ao buscar:", error));
  }

  function salvarRelatorio(e: any) {
    e.preventDefault();
    setSalvando(true);
    
    const payload = { 
      frequenciaCardiaca: parseFloat(frequencia), 
      pressaoArterial: parseFloat(pressao), 
      observacoes: observacoes 
    };

    if (editandoId) {
      api.put(`/relatorios/${editandoId}`, payload)
        .then(() => { alert("Registro atualizado!"); finalizarAcao(); })
        .catch(error => console.error("Erro ao atualizar:", error))
        .finally(() => setSalvando(false));
    } else {
      api.post('/relatorios', payload)
        .then(() => { alert("Registrado com sucesso!"); finalizarAcao(); })
        .catch(error => console.error("Erro ao cadastrar:", error))
        .finally(() => setSalvando(false));
    }
  }

  function deletarRelatorio(id: number) {
    if (window.confirm("Certeza que deseja excluir este registro médico?")) {
      api.delete(`/relatorios/${id}`)
        .then(() => carregarRelatorios());
    }
  }

  function prepararEdicao(rel: Relatorio) {
    setEditandoId(rel.id);
    setFrequencia(rel.frequenciaCardiaca.toString());
    setPressao(rel.pressaoArterial.toString());
    setObservacoes(rel.observacoes);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function finalizarAcao() {
    carregarRelatorios();
    setFrequencia(''); setPressao(''); setObservacoes(''); setEditandoId(null);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">❤️ Telemetria de Saúde</h2>
        <p className="text-slate-500 mt-2">Monitoramento de sinais vitais e registros médicos em órbita.</p>
      </div>
      
      {/* Visual idêntico às outras páginas */}
      <div className={`p-6 rounded-xl shadow-sm border mb-10 transition-colors ${editandoId ? 'bg-blue-50 border-blue-300' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-slate-700">
            {editandoId ? `✏️ Alterando Registro Médico #${editandoId}` : '🩺 Novo Registro Médico'}
          </h3>
          {editandoId && (
            <button type="button" onClick={finalizarAcao} className="text-sm text-slate-500 hover:text-slate-700 underline">Cancelar</button>
          )}
        </div>

        <form onSubmit={salvarRelatorio} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-600 mb-1">Freq. Cardíaca</label>
            <input type="number" step="0.1" value={frequencia} onChange={(e) => setFrequencia(e.target.value)} required 
              className="p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-600 mb-1">Pressão Arterial</label>
            <input type="number" step="0.1" value={pressao} onChange={(e) => setPressao(e.target.value)} required 
              className="p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-600 mb-1">Observações</label>
            <input type="text" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} required 
              className="p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <button type="submit" disabled={salvando}
            className={`font-bold py-2.5 px-4 rounded-lg text-white ${editandoId ? 'bg-blue-600' : 'bg-slate-800'}`}>
            {salvando ? 'Salvando...' : editandoId ? 'Atualizar' : 'Salvar Registro'}
          </button>
        </form>
      </div>

      <div className="overflow-hidden rounded-xl shadow-sm border border-slate-200 bg-white">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b text-sm uppercase text-slate-600">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Frequência</th>
              <th className="p-4">Pressão</th>
              <th className="p-4">Obs</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {relatorios.map(r => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono text-slate-400">#{r.id}</td>
                <td className="p-4 font-bold text-slate-800">{r.frequenciaCardiaca} bpm</td>
                <td className="p-4 text-slate-600">{r.pressaoArterial}</td>
                <td className="p-4 text-slate-600">{r.observacoes}</td>
                <td className="p-4 flex gap-2 justify-center">
                  <button
                    type="button"
                    onClick={() => prepararEdicao(r)}
                    className="text-sm px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => deletarRelatorio(r.id)}
                    className="text-sm px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
