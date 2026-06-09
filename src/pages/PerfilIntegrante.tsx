import { useParams, useNavigate } from "react-router-dom";
import { integrantes } from "../data/integrantes";

export default function PerfilIntegrante() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const integrante = integrantes.find((i) => i.id === Number(id));

  if (!integrante) {
    return (
      <div className="max-w-4xl mx-auto p-10 text-center">
        <h2 className="text-2xl font-bold text-red-600">Integrante não encontrado.</h2>
        <button 
          onClick={() => navigate('/integrantes')} 
          className="mt-4 text-blue-600 underline font-medium hover:text-blue-800"
        >
          Voltar para a Equipe
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 animate-in fade-in duration-500">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        <img 
          src={integrante.foto} 
          alt={integrante.nome} 
          className="w-48 h-48 rounded-2xl object-cover shadow-md border-4 border-slate-50" 
        />
        
        <div className="flex-grow">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{integrante.nome}</h1>
          <p className="text-slate-500 font-mono mt-1 text-lg">RM: {integrante.rm} | Turma: {integrante.turma}</p>
          
          <p className="mt-6 text-slate-700 leading-relaxed text-lg italic">
            "{integrante.bio}"
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a 
              href={integrante.github} 
              target="_blank" 
              rel="noreferrer"
              className="bg-slate-900 text-white px-5 py-2 rounded-xl font-bold hover:bg-black transition-all"
            >
              GitHub
            </a>
            <a 
              href={integrante.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              LinkedIn
            </a>
          </div>

          <div className="mt-8">
            <h4 className="font-bold text-slate-800 mb-3 uppercase tracking-wider text-sm">Habilidades:</h4>
            <div className="flex flex-wrap gap-2">
              {integrante.habilidades.map((hab) => (
                <span 
                  key={hab} 
                  className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-100 shadow-sm"
                >
                  {hab}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/integrantes')} 
        className="mt-8 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
      >
        ← Voltar para a equipe
      </button>
    </div>
  );
}