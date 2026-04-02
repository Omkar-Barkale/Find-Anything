import {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import "./styles/FileUploadModal.css"


function EditBook(){
    const {id} = useParams();
    const navigate = useNavigate();

    const[name, setName] = useState("");
    const[author, setAuthor] = useState("");
    const[description, setDescription] = useState("");
    const [targetFile, setTargetFile] = useState(null);

    const[nameError, setNameError] = useState("");
    const[authorError, setAuthorError] = useState("");
    const[descriptionError, setDescriptionError] = useState("");
    const[targetError, setTargetError] = useState("");


    const [status, setStatus] = useState("");

    useEffect(() => {
        async function fetchBook(params) {
            const res = await fetch(`http://localhost:3000/search/${id}`);
            const book = await res.json();

            setName(book.name);
            setAuthor(book.author);
            setDescription(book.body);
        }
        fetchBook();
    }, [id]);

    function handleNameChange(e){
        setName(e.target.value);
        setNameError("");
    }

    function handleAuthorChange(e){
        setAuthor(e.target.value);
        setAuthorError("");
    }
     function handleDescriptionChange(e){
        setDescription(e.target.value);
        setDescriptionError("");
     }

     function handleTargetFile(e){
        setTargetFile(e.target.files[0]);
        setTargetError("");
     }

    function formValidator(){
        let hasError=false;
        setStatus("Validating");

        if(!name){
            hasError = true;
            setNameError("This field is required");
        }
        if(!author){
            hasError = true;
            setAuthorError("This field is required")
        }
        if(!description){
            hasError = true;
            setDescriptionError("This field is required");
        }
        // if(!targetFile){
        //     hasError = true;
        //     setTargetError("This field is required");
        // }
    

        if(hasError){
            setStatus("Form failed to submit");
        }
        else{
            setStatus("Submitting");
        }

        return hasError;
    }


    //TODO: add ability to change pdf
    function handleSubmit(e){
        e.preventDefault();

        if(!formValidator()){
            
            fetch(`http://localhost:3000/search/update/${id}`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    author,
                    description
                })
            });
        }
        navigate(`/`);
    }
    
    return(
        <>
            <div className="modalOverlay">
                <form className = "modalStyle" onSubmit={handleSubmit}>
                    <div className="uploadContainer">
                        <input id='file' type='file' hidden accept = ".pdf" onChange = {(e)=>handleTargetFile(e)}></input>
                        <label htmlFor="file" className={targetError?"actualUploadBtn invalid":"actualUploadBtn"}><span>{targetFile?targetFile.name:"Click to upload a pdf"}</span></label> 
                        
                        <span>{targetError}</span>   
                    </div>

                    <div className="fields">
                        <input className={nameError?"name invalid":"name"} type='text' value={name} onChange ={(e)=>handleNameChange(e)} placeholder='Name'></input>
                        <span>{nameError}</span>

                        <input className ={authorError?"author invalid":"author"} type='text' value={author} onChange={(e)=>handleAuthorChange(e)} placeholder='Author'></input>
                        <span>{authorError}</span>

                        <input className ={descriptionError?"description invalid":"description"} type='text'  value={description} onChange={(e)=>handleDescriptionChange(e)} placeholder='Description'></input>
                        <span>{descriptionError}</span>

                        <button type="submit">Submit</button>

                    </div>
                </form> 
            </div>
        </>
    );
}

export default EditBook;