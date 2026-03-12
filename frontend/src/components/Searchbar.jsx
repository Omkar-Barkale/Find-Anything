import { useState } from "react";
import "./styles/Searchbar.css";

function Searchbar({ placeholder}) {
    
    const[search, setSearch] = useState("");
    const[message, setMessage] = useState("");
    function handleSubmit(e) {
        e.preventDefault();

        fetch("http://localhost:3000/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            search: search,
        })
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            setMessage(data.message);
            console.log("clicked on: " + data.message);
        })
        .catch(function(error){
            console.log("Error:", error);
            setMessage("Request failed (server response).");
        });

        console.log("submitted: "   + search);
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