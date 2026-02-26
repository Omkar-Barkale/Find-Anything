import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CardLayout  from './components/CardLayout.jsx'
import Searchbar from './components/Searchbar.jsx'
import './components/styles/App.css'
import NavBar from './components/NavBar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
    <Searchbar placeholder="Search for anything..." />
      <CardLayout>
        <img src="/vite.svg" alt="Vite Logo" />
        <img src="/vite.svg" alt="Vite Logo" />
        <img src="/vite.svg" alt="Vite Logo" />
        <img src="/vite.svg" alt="Vite Logo" />
        <img src="/vite.svg" alt="Vite Logo" />
        <img src="/vite.svg" alt="Vite Logo" />
        <img src="/vite.svg" alt="Vite Logo" />
        <img src="/vite.svg" alt="Vite Logo" />
        <img src="/vite.svg" alt="Vite Logo" />
        <img src="/vite.svg" alt="Vite Logo" />
      </CardLayout>
    </>
  )
}

export default App
