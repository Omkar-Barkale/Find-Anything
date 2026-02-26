import { useState } from "react";
import "./styles/Searchbar.css";

function Searchbar({ placeholder}) {
    
    const[search, setSearch] = useState("");
    function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted: "   + search);
}

    return (
        <form className="searchbar" onSubmit={handleSubmit}>
                <input id = "main-search" type="text" onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} />
        </form>
    )
}


export default Searchbar;