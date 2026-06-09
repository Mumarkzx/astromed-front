export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm border-t border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <p>© {new Date().getFullYear()} AstroMed Nexus. Todos os direitos reservados.</p>
        <p className="mt-1">Sistema de Gestão Aeroespacial Operacional.</p>
      </div>
    </footer>
  );
}