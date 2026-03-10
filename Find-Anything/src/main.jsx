import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/styles/index.css'
import App from './App.jsx' //move to app after Login is finalized
import Login from './Login.jsx' 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
