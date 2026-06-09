function Faq() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200 mt-10">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">❓ Perguntas Frequentes (FAQ)</h2>
      <div className="space-y-4">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-bold text-slate-700">Como os dados médicos são capturados?</h3>
          <p className="text-slate-600 mt-1">Os dados são inseridos manualmente pelos oficiais médicos da missão e enviados via API Rest para nossa base Oracle.</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-bold text-slate-700">O sistema funciona offline no espaço?</h3>
          <p className="text-slate-600 mt-1">Nesta versão inicial (MVP), o sistema requer conexão contínua (telemetria) com a base terrestre para sincronizar com o banco de dados.</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="font-bold text-slate-700">Como entro em contato com o suporte?</h3>
          <p className="text-slate-600 mt-1">Para emergências sistêmicas, utilize o canal de comunicação direto com o centro de controle Astromed.</p>
        </div>
      </div>
    </div>
  );
}

export default Faq;