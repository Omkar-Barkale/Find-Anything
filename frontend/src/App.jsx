
import './components/styles/Home.css'
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"
import Register from "./components/Register.jsx"
import AdminDashboard from "./components/Admin.jsx"

import {Routes, Route} from 'react-router-dom'






function App() {
  return (
    <>
      <Routes>
        <Route path = "/login/" element = {<Login/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/admindashboard" element = {<AdminDashboard/>}/>
        <Route path = "*" element ={<Home/>}/>
      </Routes>
  </>
  )
}

export default App
