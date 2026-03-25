import {useState} from "react"
import "./styles/FileUploadModal.css"

function FileUpload(){
    const[name, setName] = useState("");
    const[author, setAuthor] = useState("");
    const[description, setDescription] = useState("");
    const [targetFile, setTargetFile] = useState(null);
    const [status, setStatus] = useState("");

    return(
        <>
            <div id = 'window'>
                <form>
                    
   
                    <input id='name' type='text' onChange ={(e) => setName(e.target.value)} placeholder='Name'></input>


                    <input id='author' type='text' onChange={(e) => setAuthor(e.target.value)} placeholder='Author'></input>

          
                    <input id='desciption' type='text' onChange={(e) => setDescription(e.target.value)} placeholder='Description'></input>

                    <input id='file' type='file' onChange = {(e) => setTargetFile(e.target.files)}></input>
                </form> 
            </div>
        </>
    );
}

export default FileUpload;