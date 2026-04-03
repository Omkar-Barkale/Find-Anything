import {useState} from "react"
import {FileUploader} from "react-drag-drop-files"
import "./styles/FileUploadModal.css"


function FileUpload(){
    const fileTypes = ["PDF","EPUB"];
    const [isDragging, setIsDragging] = useState(false);

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

    function handleDragEnter(e){
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);

    }
    
    function handleDragOver(e){
        e.preventDefault();
        e.stopPropagation();
    }
    function handleDragLeave(e){
        e.preventDefault();
        e,stopPropagation();
        setIsDragging(false);
    }
    function handleDrop(e){
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        setTargetFile(e.dataTransfer.files[0]);
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
    

    async function handleSubmit(e){
        e.preventDefault();

        if(!formValidator()){
            
            const formData = new FormData();
            formData.append("name",name);
            formData.append("author",author);
            formData.append("description",description);
            formData.append("file",targetFile);

            try{
                const res = await fetch("http://localhost:3000/search/create",{
                    method:"POST",
                    body:formData
                });
                let data;
                try{
                     data = await res.json();
                }catch{
                    data = {message:"Failed to parse response from server"};
                }
                    if(res.status === 201){
                        setTargetError("Upload successful!");
                    }
                    else{
                        setTargetError(data.message || "Failed to upload file. Please try again.");
                    }
            } catch (error) {
                setTargetError("Failed to upload file. Please try again.");
                console.error("Error uploading file:", error);
            }
            
    }
}
    
    return(
        <>
            <div className="modalOverlay">
                <form className = "modalStyle" onSubmit={handleSubmit}>
                    <div className="uploadContainer">
                        <input id='file' type='file' hidden accept = ".pdf" onChange = {(e)=>handleTargetFile(e)}></input>
                        <label htmlFor="file" 
                            onDragEnter = {handleDragEnter}
                            onDragOver = {handleDragOver}
                            onDragLeave = {handleDragLeave}
                            onDrop = {handleDrop}
                            className={targetError?"actualUploadBtn invalid":"actualUploadBtn"}>
                            <span className = "uploadText">{targetFile?targetFile.name:"Click to upload a pdf"}</span>
                            </label> 
                        
                        <span>{targetError}</span>   
                    </div>

                    <div className="fields">
                        <input className={nameError?"name invalid":"name"} type='text' onChange ={(e)=>handleNameChange(e)} placeholder='Name'></input>
                        <span>{nameError}</span>

                        <input className ={authorError?"author invalid":"author"} type='text' onChange={(e)=>handleAuthorChange(e)} placeholder='Author'></input>
                        <span>{authorError}</span>

                        <input className ={descriptionError?"description invalid":"description"} type='text'   onChange={(e)=>handleDescriptionChange(e)} placeholder='Description'></input>
                        <span>{descriptionError}</span>

                        <button type="submit">Submit</button>

                    </div>
                </form> 
            </div>
        </>
    );
}

export default FileUpload;