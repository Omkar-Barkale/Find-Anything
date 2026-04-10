
import './components/styles/Home.css'
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"
import Upload from "./components/FileUploadModal.jsx"
import Register from "./components/Register.jsx"
import EditBook from "./components/EditBook.jsx"
import Admin from "./components/Admin.jsx"
import Profile from "./components/Profile.jsx"
import Breadcrumb from "./components/Breadcrumb.jsx"
import {Routes, Route} from 'react-router-dom'


function App() {
  return (
    <>
      <Breadcrumb />
      <Routes>
        <Route path = "/" element ={<Home/>}/>
        <Route path = "/login/" element = {<Login/>}/>
        <Route path = "/test/" element = {<Upload/>}/>
        <Route path = "/admindashboard" element = {<Admin/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/profile" element = {<Profile/>}/>
        <Route path = "*" element ={<Home/>}/>
        <Route path = "/book/edit/:id" element = {<EditBook/>}/>
      </Routes>
  </>
  )
}

export default App
