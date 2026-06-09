import { useState, useEffect } from 'react';
import api from '../services/api';

interface Relatorio {
  id: number;
  frequenciaCardiaca: string;
  pressaoArterial: string;
  observacoes: string;
}

function RelatoriosSaude() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [frequencia, setFrequencia] = useState('');
  const [pressao, setPressao] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarRelatorios();
  }, []);

  function carregarRelatorios() {
    api.get('/relatorios-saude')
      .then(dados => setRelatorios(dados))
      .catch(error => console.error("Erro ao buscar relatórios médicos:", error));
  }

  function cadastrarRelatorio(e: any) {
    e.preventDefault();
    setSalvando(true);
    
    const novoRelatorio = { 
      frequenciaCardiaca: frequencia, 
      pressaoArterial: pressao, 
      observacoes: observacoes 
    };

    api.post('/relatorios-saude', novoRelatorio)
      .then(() => {
        alert("Relatório médico salvo com sucesso!");
        carregarRelatorios();
        setFrequencia('');
        setPressao('');
        setObservacoes('');
      })
      .catch(error => console.error("Erro ao cadastrar relatório:", error))
      .finally(() => setSalvando(false));
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold text-slate-800 mb-8 tracking-tight">❤️ Relatórios de Saúde</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-10">
        <h3 className="text-xl font-semibold text-slate-700 mb-5 border-b pb-2">Registrar Nova Avaliação Médica</h3>
        <form onSubmit={cadastrarRelatorio} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">Frequência Cardíaca (bpm)</label>
            <input type="text" placeholder="ex: 75 bpm" value={frequencia} onChange={(e: any) => setFrequencia(e.target.value)} required 
              className="p-2 border border-slate-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">Pressão Arterial</label>
            <input type="text" placeholder="ex: 120/80 mmHg" value={pressao} onChange={(e: any) => setPressao(e.target.value)} required 
              className="p-2 border border-slate-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all" />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-slate-600 mb-1">Observações Médicas</label>
            <input type="text" placeholder="Sintomas, medicações ou estado geral..." value={observacoes} onChange={(e: any) => setObservacoes(e.target.value)} required 
              className="p-2 border border-slate-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all" />
          </div>
          
          <button type="submit" disabled={salvando} 
            className={`font-semibold py-2 px-4 rounded transition-colors shadow-sm h-[42px] text-white flex justify-center items-center md:col-span-4
              ${salvando ? 'bg-slate-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}>
            {salvando ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Transmitindo Dados...
              </span>
            ) : 'Salvar Relatório Médico'}
          </button>
        </form>
      </div>

      {relatorios.length === 0 ? (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded border border-yellow-200">
          Nenhum relatório de saúde registrado até o momento.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl shadow-sm border border-slate-200 bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Frequência Cardíaca</th>
                <th className="p-4 font-medium">Pressão Arterial</th>
                <th className="p-4 font-medium">Observações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {relatorios.map(relatorio => (
                <tr key={relatorio.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-sm text-slate-500">{relatorio.id}</td>
                  <td className="p-4 font-medium text-slate-800">{relatorio.frequenciaCardiaca}</td>
                  <td className="p-4 text-slate-600">{relatorio.pressaoArterial}</td>
                  <td className="p-4 text-slate-600">{relatorio.observacoes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RelatoriosSaude;