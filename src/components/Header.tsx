import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between">
        <div className="font-extrabold text-xl text-blue-400 tracking-wider flex items-center gap-2">
          <span>🚀</span> ASTROMED
        </div>
        <div className="flex gap-4 text-sm font-medium">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/missoes" className="hover:text-blue-400 transition-colors">Missões</Link>
          <Link to="/tripulacao" className="hover:text-blue-400 transition-colors">Tripulação</Link>
          <Link to="/saude" className="hover:text-blue-400 transition-colors">Saúde</Link>
          <Link to="/integrantes" className="hover:text-blue-400 transition-colors">Integrantes</Link>
          <Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link>
          <Link to="/sobre" className="hover:text-blue-400 transition-colors">Sobre</Link>
        </div>
      </div>
    </nav>
  );
}