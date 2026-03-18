import { useState, useEffect } from "react";
import "./styles/Searchbar.css";
import CardLayout  from './CardLayout.jsx'
import Card from './Card.jsx'
import bookData from '../../../backend/src/data/books.json'


function Searchbar({ placeholder}) {
    
    const[search, setSearch] = useState("");
    const[books, setBooks] = useState(bookData);

    const handleSubmit = async(e) => {
            e.preventDefault();
            const response = await fetch(`http://localhost:3000/search/${search}`);
            const data = await response.json();
            console.log(data);            
            setBooks(data);    
        }

    //error, useState initially uses an array, but response.json returns json obj not an array, so map does not work
        return (
            <>
                <form className="searchbar" onSubmit={handleSubmit}>
                    <input id = "main-search" type="text" onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} />
                </form>
                      <CardLayout>
                        {books.map((book) => (<Card key = {book.id} name = {book.name} author = {book.author} body = {book.body} cover = {book.cover}></Card>))}
                     </CardLayout>
            </>
        )
} 

export default Searchbar;