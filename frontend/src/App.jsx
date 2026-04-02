
import './components/styles/Home.css'
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"
import Upload from "./components/FileUploadModal.jsx"
import EditBook from "./components/EditBook.jsx"

import {Routes, Route} from 'react-router-dom'






function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element ={<Home/>}/>
        <Route path = "/login/" element = {<Login/>}/>
        <Route path = "/test/" element = {<Upload/>}/>
        <Route path = "/book/edit/:id" element = {<EditBook/>}/>
      </Routes>
  </>
  )}

export default App
