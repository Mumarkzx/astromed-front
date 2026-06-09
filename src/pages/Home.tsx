import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-5xl mx-auto mt-8">
      <div className="bg-slate-900 text-white rounded-2xl p-10 shadow-lg text-center border border-slate-700">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          AstroMed <span className="text-blue-500">Nexus</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Sistema integrado para monitoramento de tripulação, logística de missões aeroespaciais e telemetria de saúde em tempo real.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/missoes" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Painel de Missões
          </Link>
          <Link to="/tripulacao" className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Tripulação
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-3xl mb-3">👨‍🚀</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Gestão de Pessoas</h3>
          <p className="text-slate-600">Cadastro centralizado de comandantes, engenheiros e especialistas.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-3xl mb-3">🌌</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Logística Espacial</h3>
          <p className="text-slate-600">Mapeamento de rotas, destinos e status operacional de cada lançamento.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-3xl mb-3">❤️</div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Dados Vitais</h3>
          <p className="text-slate-600">Registro histórico de pressão arterial e frequência cardíaca em órbita.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;