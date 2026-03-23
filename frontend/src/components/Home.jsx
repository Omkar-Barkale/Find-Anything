import { useState, useNavigation } from 'react'
import Searchbar from './Searchbar.jsx'
import './styles/Home.css'
import NavBar from './NavBar.jsx'







function Home() {
  return (
    <>
    <NavBar/>
    <h1 id = "find-text">Find </h1> <h1 id = "anything-text">Anything</h1>
    <Searchbar placeholder="Search for anything..." />
  </>
  )}

export default Home