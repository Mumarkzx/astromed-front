import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';

// Importação das Páginas
import Home from '../pages/Home';
import Missoes from '../pages/Missoes';
import DetalheMissao from '../pages/DetalheMissao';
import Usuarios from '../pages/Usuarios';
import RelatoriosSaude from '../pages/RelatoriosSaude';
import Integrantes from '../pages/Integrantes';
import Sobre from '../pages/Sobre';
import Faq from '../pages/Faq';
import PerfilIntegrante from '../pages/PerfilIntegrante';
import Contato from '../pages/Contato'; 

export default function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/missoes" element={<Missoes />} />
        <Route path="/missao/:id" element={<DetalheMissao />} />
        <Route path="/tripulacao" element={<Usuarios />} />
        <Route path="/saude" element={<RelatoriosSaude />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/integrantes" element={<Integrantes />} />
        <Route path="/integrantes/:id" element={<PerfilIntegrante />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </Layout>
  );
}