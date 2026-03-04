import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CardLayout  from './components/CardLayout.jsx'
import Searchbar from './components/Searchbar.jsx'
import Card from './components/Card.jsx'
import './components/styles/App.css'
import NavBar from './components/NavBar.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
    <h1>Find Anything</h1>
    <Searchbar placeholder="Search for anything..." />
      <CardLayout>
        <Card title="Card 1" body="This is the first card." img="src\assets\ubc.png" />
        <Card title="Card 2" body="This is the second card." img="src\assets\Sin Eater.jpg" />
        <Card title="Card 3" body="This is the third card." img="src\assets\The Beloved girls.jpg" />
        <Card title="Card 4" body="This is the fourth card." img ="src\assets\Deadly Keyholes.jpg" />
      </CardLayout>
  </>
  )}

export default App
