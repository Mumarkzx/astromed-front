import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Missoes from './pages/Missoes';
import Usuarios from './pages/Usuarios'; // <-- Importamos a nova tela
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/" className="nav-link">Início</Link>
        <Link to="/missoes" className="nav-link">Missões</Link>
        <Link to="/usuarios" className="nav-link">Tripulação</Link> {/* <-- Novo botão no menu */}
      </nav>

      <Routes>
        <Route path="/" element={
          <div className="container">
            <h1>🚀 AstroMed System</h1>
            <p>Selecione uma opção no menu acima para começar a gestão.</p>
          </div>
        } />
        <Route path="/missoes" element={<Missoes />} />
        <Route path="/usuarios" element={<Usuarios />} /> {/* <-- Nova rota registrada */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;