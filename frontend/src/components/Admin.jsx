import { useState, useNavigation } from 'react'
import Searchbar from './Searchbar.jsx'
import CardLayout  from './CardLayout.jsx'
import UserCards  from './UserCards.jsx'
import Card from './Card.jsx'
function Admin(){

    const [menu, setMenu] = useState("books");
    const [path, setPath] = useState();
    const [itmes, setItems] = useState();
    useEffect(() => { //loads all books from MongoDB on initial render, only once([]) instead of reading from json file
    
            const token = localStorage.getItem('userToken');
            const load = async () => {
                    const response = await fetch('http://localhost:3000/search/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }); 
                    //TODO 
                    // added if statement is the fetch fails due to bad token 
                    const data = await response.json();
                    setItems(data);
            }
            load();
        }, [])

        function mapItems(item){
            switch(menu){
                case "books":
                    return <Card key = {item._id} name = {book.name} author = {book.author} body = {book.body} cover = {book.cover}></Card>
                case "users":
                    return <UserCards key = {book._id} name = {book.name} author = {book.author} body = {book.body} cover = {book.cover}></UserCards>
            }


            //<Card key = {book._id} name = {book.name} author = {book.author} body = {book.body} cover = {book.cover}></Card>
        }


    
    return(
    <div id='AdminDashboard'>
        <div id='menu'>
            <Searchbar placeholder={"Search for " + menu} />
            <CardLayout id="cardlayout">
                {items.map((item) => (mapItems(item)))}
            </CardLayout>

        </div>
        
        <div id='info'>
            <div id='pages'>
                <button>Home</button>
                <button>Users</button>
                <button>Books</button>
                <button>Logs</button>
            </div>
            <div id='bottom buttons'>
                <button>Log out</button>
            </div>
        </div>
    </div>
    );

}

export default Admin;