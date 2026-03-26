import {useState} from "react"
import "./styles/FileUploadModal.css"


function FileUpload(){
    const[name, setName] = useState("");
    const[author, setAuthor] = useState("");
    const[description, setDescription] = useState("");
    const [targetFile, setTargetFile] = useState(null);

    const[nameError, setNameError] = useState("");
    const[authorError, setAuthorError] = useState("");
    const[descriptionError, setDescriptionError] = useState("");
    const[targetError, setTargetError] = useState("");


    const [status, setStatus] = useState("");

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
        if(!targetFile){
            hasError = true;
            setTargetError("This field is required");
        }
    

        if(hasError){
            setStatus("Form failed to submit");
        }
        else{
            setStatus("Submitting");
        }

        return hasError;
    }

    function handleSubmit(e){
        e.preventDefault();

        if(!formValidator()){
            
            const formData = new FormData();
            formData.append("name",name);
            formData.append("author",author);
            formData.append("description",description);
            formData.append("file",targetFile);

            const res = fetch("http://localhost:3000/search/create",{
                method:"POST",
                body:formData
            }).then((res) => {console.log(res);return res.json();})
            .then((data)=>{
                console.log(data);
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
    
    return(
        <>
            <div className="modalOverlay">
                <form className = "modalStyle" onSubmit={handleSubmit}>
                    <div className="uploadContainer">
                        <input id='file' type='file' hidden required accept = ".pdf" onChange = {(e)=>handleTargetFile(e)}></input>
                        <label htmlFor="file" className={targetError?"actualUploadBtn invalid":"actualUploadBtn"}><span>{targetFile?targetFile.name:"Click to upload a pdf"}</span></label> 
                        
                        <span>{targetError}</span>   
                    </div>

                    <div className="fields">
                        <input className={nameError?"name invalid":"name"} type='text' required onChange ={(e)=>handleNameChange(e)} placeholder='Name'></input>
                        <span>{nameError}</span>

                        <input className ={authorError?"author invalid":"author"} type='text' required onChange={(e)=>handleAuthorChange(e)} placeholder='Author'></input>
                        <span>{authorError}</span>

                        <input className ={descriptionError?"description invalid":"description"} type='text' required onChange={(e)=>handleDescriptionChange(e)} placeholder='Description'></input>
                        <span>{descriptionError}</span>

                        <button type="submit">Submit</button>

                    </div>
                </form> 
            </div>
        </>
    );
}

export default FileUpload;