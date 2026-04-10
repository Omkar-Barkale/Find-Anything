import { useState, useEffect } from 'react'
import CardLayout  from './CardLayout.jsx'
import UserCards  from './UserCards.jsx'
import './styles/Admin.css'
import {useNavigate} from 'react-router-dom';


function Admin(){

    const token = localStorage.getItem("token")
    // console.log("the token is: "+ token);
    const navigate = useNavigate();
    const [menu, setMenu] = useState("users");
    const [items, setItems] = useState([]);
    const [books, setBooks] = useState([]);
    const [logs, setLogs] = useState([]);
    const [search, setSearch] = useState("");

 
    function loadUsers(){
        fetch('http://localhost:3000/auth/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(function(res){
            return res.json();
        }).then(function(users){
             if('error' in users){
                console.log("error was sent from getting users");
                console.log(users.error);
            }else{
            console.log("users set");
            setItems(users);
            }
        }).catch(function(error){
            console.log("Error:", error);
        });
  
    } 

    function loadBooks(){
        fetch('http://localhost:3000/search/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(function(res){
            return res.json();
        }).then(function(books){
            if('error' in books){
                console.log("error was sent from search");
                console.log(books.error);
            }
            else{
            console.log("books set");
            setBooks(books);
            }
        })
    }

    function loadLogs(e=null){
        if(e){
            e.preventDefault();
        }
        let path;
          
        if(search){
            
            path = `http://localhost:3000/auth/logs/${search}`;
        }
        else{
            path = `http://localhost:3000/auth/logs`
        }
     
      
        fetch(path, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function(res){
            if(res.ok){
                return res.json();
            }else{
                console.log("res is not ok");
                console.log("response is " + res.status);
                return null;
            }
        }).then(function(logs){
            if(!logs){
                return;
            }
            if('error' in logs){
                console.log("error was sent from logs/search");
                console.log(logs.error);
            }
            else{
                console.log("logs were gotten");
                setLogs(logs)
            }
        });
        
    }

    useEffect(() => {
        // console.log("The token is " + token);    
        const reloadData = () => {
            if(menu === "users"){
                loadUsers();
            }
            if(menu === "books"){
                loadBooks();
            }
            if(menu === "logs"){
                loadLogs();
            }
        }

        const interval = setInterval(reloadData, 10000)//reloads data every 10 seconds
        return () => clearInterval(interval);
        }, [menu])

    function getAvatar(user){
        return `data:${user.avatarType};base64,${user.avatar}`;
        }

    function numPosts(user){
            return 0;
    }

    function goHome(){
        navigate("/Home");
    }

    function getCover(book){
         return `data:${book.imgType};base64,${book.image.data}`;
    }

    function Logout(){
            console.log("logged out")
            //TODO delete token
            navigate("/login");
        }
        
    const deleteUser = async (id) => {
        console.log("delete was clicked " + id);  
        const response = await fetch(`http://localhost:3000/auth/delete/${id}`, 
                    {
                        method: 'DELETE',
                        headers: 
                        {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }); 
        if(!response.ok){
            console.log(response.ok);           
        }else{
            //useEffect
            console.log(response.ok);
            loadUsers();
        }
          
     }

    const deleteBook = async (id) => {
        console.log("delete was clicked " + id);  
        const response = await fetch(`http://localhost:3000/search/delete/${id}`, 
                    {
                        method: 'DELETE',
                        headers: 
                        {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }); 
        if(!response.ok){
            console.log(response.ok);           
        }else{
            //useEffect
            console.log(response.ok);
            loadBooks();
        }
    }


    function showbooks(){
        try{
            return <CardLayout id="adminCardLayout">
                {books.map((item) => (<UserCards key = {item._id} name = {item.name} author = {item.author} cover = {getCover(item)} body = {item.body} onDelete={deleteBook} id={item._id} menu={menu}></UserCards>))}
            </CardLayout>;
        }catch(err){
            console.log(err.message);
        }
        
        
    }

    function showLogs(){
        try{
            return <CardLayout id="adminCardLayout">
                {logs.map((item) => (<UserCards key = {item._id} username = {item.username} email = {item.email} menu={menu} body = {item.log} time = {item.time}></UserCards>))}
            </CardLayout>;
        }catch(err){
            console.log(err.message);
        }
    }

    function users(){
        try{
            return <CardLayout id="adminCardLayout">
                {items.map((item) => (<UserCards key = {item._id} username = {item.username} avatar = {getAvatar(item)} role = {item.role} email = {item.email} numPosts = {numPosts(item)} onDelete={deleteUser} id={item._id} menu={menu}></UserCards>))}
            </CardLayout>;
        }catch(err){
            console.log(err.message);
        }
        
        
        
    }

    return(
    <div id='AdminDashboard'>
        <div id= "menu">
            <h2>Moderation</h2>
            <form className="searchbar" onSubmit={loadLogs}>
                <input type='text' id = "main-search" placeholder='search' onChange={(e) => setSearch(e.target.value)}></input>
            </form>
            <div id='content-area'>
                {menu === "users" ? users() : ""}
                {menu === "books" ? showbooks() : ""}
                {menu === "logs" ? showLogs() : ""}
            </div>
        </div>
        
        
        <div id="left-menu">
            <p>Username</p>
            <div id='info'>
                <div id='pages'>
                    <button onClick={() => goHome()}>Home</button>
                    <button onClick={() => setMenu("users")}>Users</button>
                    <button onClick={() => setMenu("books")}>Books</button>
                    <button onClick={() => setMenu("logs")}>Logs</button>
                </div>
                <div id='bottom_buttons'>
                    <button id="logout" onClick={() => Logout()}>Log out</button>
                </div>
            </div>
        </div>
    </div>
    );

}

export default Admin;