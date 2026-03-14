import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CardLayout  from './components/CardLayout.jsx'
import Searchbar from './components/Searchbar.jsx'
import Card from './components/Card.jsx'
import './components/styles/App.css'
import NavBar from './components/NavBar.jsx'
import bookData from '../../backend/src/data/books.json'

function App() {
  const [count, setCount] = useState(0)
  const [books, setBooks] = useState(bookData);
  return (
    <>
    <NavBar/>
    <h1>Find Anything</h1>
    <Searchbar placeholder="Search for anything..." />
      <CardLayout>
        {books.map((book) => (<Card name = {book.name} author = {book.author} body = {book.body} cover = {book.cover}></Card>))}
      </CardLayout>
  </>
  )}

export default App
