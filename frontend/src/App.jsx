
import './components/styles/Home.css'
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"
import Upload from "./components/FileUploadModal.jsx"
import Register from "./components/Register.jsx"
import EditBook from "./components/EditBook.jsx"
import Admin from "./components/Admin.jsx"
import Profile from "./components/Profile.jsx"

import {Routes, Route} from 'react-router-dom'
import NotFound from './components/NotFound.jsx'


function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element ={<Home/>}/>
        <Route path = "/home" element ={<Home/>}/>
        <Route path = "/login/" element = {<Login/>}/>
        <Route path = "/test/" element = {<Upload/>}/>
        <Route path = "/admindashboard" element = {<Admin/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/profile" element = {<Profile/>}/>
        <Route path = "/book/edit/:id" element = {<EditBook/>}/>
        <Route path = "*" element ={<NotFound/>}/>
      </Routes>
  </>
  )
}

export default App
