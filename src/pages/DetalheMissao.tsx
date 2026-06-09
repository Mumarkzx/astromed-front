import { useParams } from 'react-router-dom';

export default function DetalheMissao() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200 mt-10">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">🔍 Detalhes da Missão: {id}</h2>
      <p className="text-slate-600 flex items-center gap-2">
        <span className="animate-pulse h-3 w-3 bg-blue-500 rounded-full inline-block"></span>
        Sincronizando com o banco de dados principal...
      </p>
    </div>
  );
}