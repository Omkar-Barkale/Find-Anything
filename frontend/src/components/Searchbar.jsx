import { useState, useEffect } from "react";
import "./styles/Searchbar.css";
import CardLayout  from './CardLayout.jsx'
import Card from './Card.jsx'


 function Searchbar({ placeholder}) {
    
    const[books, setBooks] = useState([]);
    
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
                setBooks(data);
        }
        load();
    }, [])

    const[search, setSearch] = useState("");
    const[text, setText] = useState("");

    const handleSubmit = async(e) => {
            e.preventDefault();
            const response = await fetch(`http://localhost:3000/search/${search}`);
            const data = await response.json();
            console.log(data);   
            if(data.length > 0)         
            {
                setBooks(data);
                setText("");
            }
            else
            {
                setBooks([]);
                setText("No results found");    
            }
            e.target.reset();
        }

        return (
            <>
                <form className="searchbar" onSubmit={handleSubmit}>
                    <input id = "main-search" type="text" onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} />
                </form>
                      <CardLayout>
                        {books.map((book) => (<Card key = {book._id} name = {book.name} author = {book.author} body = {book.body} cover = {book.cover}></Card>))}
                     </CardLayout>

                     <h2>{text}</h2>
            </>
        )
} 


export default Searchbar;