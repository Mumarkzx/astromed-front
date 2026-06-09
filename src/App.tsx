import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import Missoes from './pages/Missoes';
import Usuarios from './pages/Usuarios';
import RelatoriosSaude from './pages/RelatoriosSaude'; // NOVO MÓDULO

const Home = () => (
  <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-slate-200 mt-10">
    <h2 className="text-3xl font-bold text-slate-800 mb-4">🏠 Página Inicial</h2>
    <p className="text-slate-600 text-lg">Bem-vindo ao sistema integrado de gestão de missões da Astromed.</p>
  </div>
);

const Integrantes = () => (
  <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-slate-200 mt-10">
    <h2 className="text-3xl font-bold text-slate-800 mb-6">👥 Integrantes</h2>
    <div className="bg-slate-50 p-4 rounded border border-slate-200">
      <p className="font-semibold text-slate-700 text-lg">Marcos Antônio Marques De Araújo Júnior</p>
      <p className="text-slate-600 font-mono mt-1">RM: [COLOQUE_SEU_RM_AQUI]</p>
      <p className="text-slate-600 mb-4">Turma: 1TDS</p>
      <div className="flex gap-4">
        <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">LinkedIn</a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">GitHub</a>
      </div>
    </div>
  </div>
);

const Sobre = () => (
  <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-slate-200 mt-10">
    <h2 className="text-3xl font-bold text-slate-800 mb-4">ℹ️ Sobre a Plataforma</h2>
    <p className="text-slate-600">A Astromed é uma infraestrutura tecnológica desenvolvida para orquestrar missões aeroespaciais e o gerenciamento de tripulantes na nuvem.</p>
  </div>
);

const DetalheMissao = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-slate-200 mt-10">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">🔍 Detalhes da Missão: {id}</h2>
      <p className="text-slate-600 flex items-center gap-2">
        <span className="animate-pulse h-3 w-3 bg-blue-500 rounded-full inline-block"></span>
        Consultando banco de dados Oracle...
      </p>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 font-sans">
        <nav className="bg-slate-900 text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-4 flex gap-6 items-center">
            <div className="font-bold text-xl text-blue-400 mr-4 tracking-wider">🚀 ASTROMED</div>
            <Link to="/" className="hover:text-blue-400 transition-colors font-medium">Home</Link>
            <Link to="/missoes" className="hover:text-blue-400 transition-colors font-medium">Missões</Link>
            <Link to="/tripulacao" className="hover:text-blue-400 transition-colors font-medium">Tripulação</Link>
            <Link to="/saude" className="hover:text-blue-400 transition-colors font-medium">Saúde</Link>
            <Link to="/integrantes" className="hover:text-blue-400 transition-colors font-medium">Integrantes</Link>
            <Link to="/sobre" className="hover:text-blue-400 transition-colors font-medium">Sobre</Link>
          </div>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/missoes" element={<Missoes />} />
            <Route path="/missao/:id" element={<DetalheMissao />} />
            <Route path="/tripulacao" element={<Usuarios />} />
            <Route path="/saude" element={<RelatoriosSaude />} /> {/* NOVA ROTA */}
            <Route path="/integrantes" element={<Integrantes />} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;