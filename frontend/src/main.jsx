import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/styles/index.css'
import Login from './Login.jsx'
import App from './App.jsx' //move to app after Login is finalized


import {createBrowserRouter, RouterProvider} from 'react-router-dom'
 
const router = createBrowserRouter([
  {path: '/', element: <Login/>},
  {path: '/Home', element: <Home/>}

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
