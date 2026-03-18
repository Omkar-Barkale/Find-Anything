import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CardLayout  from './components/CardLayout.jsx'
import Searchbar from './components/Searchbar.jsx'
import Card from './components/Card.jsx'
import './components/styles/App.css'
import NavBar from './components/NavBar.jsx'





function App() {
  return (
    <>
    <NavBar/>
    <h1>Find Anything</h1>
    <Searchbar placeholder="Search for anything..." />
  </>
  )}

export default App
