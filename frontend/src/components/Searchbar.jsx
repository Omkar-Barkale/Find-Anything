import { useState, useEffect } from "react";
import "./styles/Searchbar.css";
import CardLayout  from './CardLayout.jsx'
import Card from './Card.jsx'


 function Searchbar({ placeholder}) {
    
    const[books, setBooks] = useState([]);

    function getImageURL(book)  {
        if(book.image && book.imgType)
            return `data:${book.imgType};base64,${book.image.data}`;
        return null;
    }
    
    useEffect(() => { //loads all books from MongoDB on initial render, only once([]) instead of reading from json file

        const load = async () => {
                const response = await fetch('http://localhost:3000/search/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }); 
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
                        {books.map((book) => (<Card key = {book._id} id = {book._id} name = {book.name} author = {book.author} body = {book.body}cover = {getImageURL(book)} description = {book.description}></Card>))}
                     </CardLayout>

                     <h2>{text}</h2>
            </>
        )
} 


export default Searchbar;