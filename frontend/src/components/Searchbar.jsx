import { useState, useEffect } from "react";
import "./styles/Searchbar.css";

function Searchbar({ placeholder}) {
    
    const[search, setSearch] = useState("");
    const[books, setBooks] = useState([]);

    const handleSubmit = async(e) => {
            e.preventDefault();
            const response = await fetch(`http://localhost:3000/search/${search}`);
            const data = await response.json();
            setBooks(data);
    }

        return (
            <>
                <form className="searchbar" onSubmit={handleSubmit}>
                    <input id = "main-search" type="text" onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} />
                </form>
            </>
        )
} 

export default Searchbar;