import { useState, useEffect } from "react";
import "./styles/Searchbar.css";

function Searchbar({ placeholder}) {
    
    const[search, setSearch] = useState("");
    const[message, setMessage] = useState("");

    const handleSubmit = async(e) => {
            e.preventDefault();
            const response = await fetch('http://localhost:3000/search',
            {method : 'POST', 
             headers : {'Content-Type' : 'application/json'},
             body : JSON.stringify({search})
            });
            
            const data = await response.json();
            setMessage(data.message);
    }

        return (
            <>
                <form className="searchbar" onSubmit={handleSubmit}>
                    <input id = "main-search" type="text" onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} />
                </form>
                <p>{message}</p>
            </>
        )
} 

export default Searchbar;