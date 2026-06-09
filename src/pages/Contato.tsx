import { useState } from "react";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  function handleEnviar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);

    // Simulação de envio da mensagem
    setTimeout(() => {
      alert("Mensagem enviada com sucesso! A equipa AstroMed responderá em breve.");
      setNome("");
      setEmail("");
      setMensagem("");
      setEnviando(false);
    }, 1000);
  }

  return (
    <div className="max-w-6xl mx-auto p-4 animate-in fade-in duration-500">
      {/* Cabeçalho da Página */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">📬 Contato</h2>
        <p className="text-slate-600">Tem dúvidas, críticas ou sugestões? Entra em contacto com a equipa de suporte da AstroMed.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna do Formulário */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Envia uma mensagem</h3>
          
          <form onSubmit={handleEnviar} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nome Completo</label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Introduz o teu nome"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="exemplo@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Mensagem</label>
              <textarea
                required
                rows={5}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Escreve aqui a tua mensagem..."
              />
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md disabled:bg-blue-400"
            >
              {enviando ? "A enviar..." : "Enviar Mensagem"}
            </button>
          </form>
        </div>

        {/* Coluna de Informações Adicionais */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Canais Diretos</h3>
            <p className="text-slate-400 text-sm mb-6">Se preferires, podes contactar-nos diretamente através dos nossos canais oficiais de atendimento.</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">E-mail Global</h4>
                <p className="text-blue-400 font-medium">suporte@astromed.com</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Telefone</h4>
                <p className="text-slate-200 font-medium">+55 (11) 99999-9999</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Sede</h4>
                <p className="text-slate-200 font-medium text-sm">São Paulo, SP - Brasil</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 text-sm text-blue-800">
            <h4 className="font-bold mb-1">⏰ Horário de Atendimento</h4>
            <p>Segunda a Sexta: 09:00 às 18:00</p>
            <p className="mt-2 text-xs text-blue-600">Tempo médio de resposta: até 24 horas úteis.</p>
          </div>
        </div>
      </div>
    </div>
  );
}