# 🚀 AstroMed - Global Solution FIAP 2026

AstroMed é uma plataforma de monitoramento de saúde e gestão de tripulação desenvolvida para ambientes extremos, conectando os desafios da economia espacial com inovações tecnológicas aplicadas à medicina e à infraestrutura de dados na Terra.

---

## 🔗 Links do Projeto


* 🌐 **Deploy na Vercel:** [COLE_AQUI_O_LINK_DA_VERCEL]
* ▶️ **Vídeo de Demonstração (YouTube):** [COLE_AQUI_O_LINK_DO_YOUTUBE]
* 📂 **Repositório GitHub:** [COLE_AQUI_O_LINK_DO_GITHUB]

---

## 🛠️ Tecnologias Utilizadas

O ecossistema da aplicação foi planejado com foco em performance, tipagem estática e componentização:

### Front-End (Interface & Navegação)
* **React** - Biblioteca base para a construção da interface SPA.
* **Vite** - Build tool de alta performance para o ambiente de desenvolvimento.
* **TypeScript** - Arquitetura de código robusta com tipagem estática.
* **Tailwind CSS** - Estilização moderna e responsiva baseada em utilitários.
* **React Router DOM** - Gerenciamento dinâmico de rotas de navegação.

### Back-End & Persistência (Integração)
* **Java** - Arquitetura robusta para processamento de regras de negócios e APIs.
* **Oracle Database** - Armazenamento relacional seguro dos históricos médicos e dados da tripulação.

---

## 📂 Estrutura de Pastas (Front-End)

A organização do código segue o padrão de separação de responsabilidades e reutilização de componentes:

```text
📦 src
 ┣ 📂 components     # Componentes de interface (Ex: Layout, Navbar)
 ┣ 📂 data           # Arquivos de dados estáticos e mockados (Ex: integrantes.ts)
 ┣ 📂 pages          # Telas principais (Home, Integrantes, Contato, Perfil)
 ┣ 📂 routes         # Configuração do ecossistema de rotas (AppRoutes.tsx)
 ┣ 📜 main.tsx       # Ponto de entrada do ecossistema React
 ┗ 📜 index.css      # Estilos globais e injeção do Tailwind CSS