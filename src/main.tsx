import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' 
// @ts-ignore: CSS import declarations not available in this TS config
import './index.css' // <-- A PONTE DO TAILWIND AQUI!

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)