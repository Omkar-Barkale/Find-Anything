import { useState, useNavigation, useEffect } from 'react'
import Searchbar from './Searchbar.jsx'
import CardLayout  from './CardLayout.jsx'
import UserCards  from './UserCards.jsx'
import './styles/Admin.css'
// import "./styles/Searchbar.css";

function Admin(){

    const [menu, setMenu] = useState("users");
    const [path, setPath] = useState(); //for profile
    const [items, setItems] = useState();
    
    useEffect(() => { //loads all books from MongoDB on initial render, only once([]) instead of reading from json file
    
            //const token = localStorage.getItem('userToken');
            const load = async () => {
                   try{
                     const response = await fetch('http://localhost:3000/auth/users', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }); 
                    //TODO 
                    // added if statement is the fetch fails due to bad token 
                    const data = await response.json();
                    console.log(data);
                    setItems(data);
                   }catch(error){
                        console.log("error");
                   }
                    
            }
            load();
        }, [])

        function getAvatar(user){
            return "./path.png";
        }
``
        function numPosts(user){
            return 0;
        }

        function Logout(){
            console.log("logged out")
            //alert("User Logged out");
        }
        
    return(
    <div id='AdminDashboard'>
        <div id='menu'>
            {/* <Searchbar placeholder={"Search for " + menu} /> */}
            <h2>Moderation</h2>
            <CardLayout id="adminCardLayout">
                {items.map((item) => (<UserCards key = {item._id} username = {item.username} avatar = {getAvatar(item._id)} role = {item.role} email = {item.email} numPosts = {numPosts(item._id)}></UserCards>))}
            </CardLayout>

        </div>
        
        <div id="left-menu">
            <p>Username</p>
            <div id='info'>
                <div id='pages'>
                    <button onClick={() => setMenu("home")}>Home</button>
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