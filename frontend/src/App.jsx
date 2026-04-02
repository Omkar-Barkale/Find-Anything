
import './components/styles/Home.css'
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"
import Register from "./components/Register.jsx"
import EditBook from "./components/EditBook.jsx"
import Admin from "./components/Admin.jsx"

import {Routes, Route} from 'react-router-dom'


function App() {
  return (
    <>
      <Routes>
        <Route path = "/admindashboard" element = {<Admin/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "*" element ={<Home/>}/>
        <Route path = "/book/edit/:id" element = {<EditBook/>}/>
      </Routes>
  </>
  )
}

export default App
