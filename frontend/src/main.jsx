import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/styles/index.css'
import Login from './Login.jsx'
import Home from './Home.jsx' //move to app after Login is finalized



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login/>
  </StrictMode>,
)
