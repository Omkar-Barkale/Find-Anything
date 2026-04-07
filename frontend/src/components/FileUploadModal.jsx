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
    const[coverFile, setCoverFile] = useState(null);

    const[nameError, setNameError] = useState("");
    const[authorError, setAuthorError] = useState("");
    const[descriptionError, setDescriptionError] = useState("");
    const[targetError, setTargetError] = useState("");
    const[coverError, setCoverError] = useState("");


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
     function handleCoverFile(e){
        setCoverFile(e.target.files[0]);
        setCoverError("");
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
            formData.append("cover",coverFile);

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
        // <>
        //     <div className="modalOverlay">
        //         <form className = "modalStyle" onSubmit={handleSubmit}>
        //             <div className="uploadContainer">
        //                 <input id='file' type='file' hidden accept = ".pdf" onChange = {(e)=>handleTargetFile(e)}></input>
        //                 <label htmlFor="file" 
        //                     onDragEnter = {handleDragEnter}
        //                     onDragOver = {handleDragOver}
        //                     onDragLeave = {handleDragLeave}
        //                     onDrop = {handleDrop}
        //                     className={targetError?"actualUploadBtn invalid":"actualUploadBtn"}>
        //                     <span className = "uploadText">{targetFile?targetFile.name:"Click to upload a pdf"}</span>
        //                     </label> 
                        
        //                 <span>{targetError}</span>   
        //             </div>

        //             <div className="fields">
        //                 <input className={nameError?"name invalid":"name"} type='text' onChange ={(e)=>handleNameChange(e)} placeholder='Name'></input>
        //                 <span>{nameError}</span>

        //                 <input className ={authorError?"author invalid":"author"} type='text' onChange={(e)=>handleAuthorChange(e)} placeholder='Author'></input>
        //                 <span>{authorError}</span>

        //                 <input className ={descriptionError?"description invalid":"description"} type='text'   onChange={(e)=>handleDescriptionChange(e)} placeholder='Description'></input>
        //                 <span>{descriptionError}</span>

        //                 <button type="submit">Submit</button>

        //             </div>
        //         </form> 
        //     </div>
        // </>

        <div className="fileModalOverlay">
            
            <form className = "modalStyle" onSubmit={handleSubmit}>
                <h2 className="modalTitle">Upload a Book</h2> 

                <div id = "formElements">
                    <div className = "files uploadContainer">


                        <input type="file" id="file" hidden accept=".pdf,.epub" onChange={(e)=>handleTargetFile(e)}></input>
                        <label htmlFor="file"
                            onDragEnter = {handleDragEnter}
                            onDragOver = {handleDragOver}
                            onDragLeave = {handleDragLeave}
                            onDrop = {handleDrop}
                            className={targetError?"actualUploadBtn invalid document":"actualUploadBtn document"}>
                            <span className = "uploadText">{targetFile?targetFile.name:"Click or drop a book file"}</span>
                            <embed   src={targetFile?URL.createObjectURL(targetFile):null} alt="" className="filePreview"/>
                            <span>{targetError}</span>
                        </label>     

                    </div>
                    <div className = "fields uploadContainer">
                                                 
                        <input type="file" id="cover" hidden accept=".jpg,.jpeg,.png" onChange={(e)=>handleCoverFile(e)}></input>
                        <label htmlFor="cover"
                            onDragEnter = {handleDragEnter}
                            onDragOver = {handleDragOver}
                            onDragLeave = {handleDragLeave}
                            onDrop = {handleDrop}
                            className={coverError?"actualUploadBtn invalid image":"actualUploadBtn image"} overflow="hidden">
                            <span className = "uploadText">{coverFile?coverFile.name:"Click or drop a cover image (optional)"}</span>
                            <img src={coverFile?URL.createObjectURL(coverFile):null} alt="" className="coverPreview"/>
                            <span>{coverError}</span>
                        </label>

                        <input className={nameError?"name textfield invalid":"name textfield"} type='text' onChange ={(e)=>handleNameChange(e)} placeholder='The Best Book'></input>
                        <span>{nameError}</span>

                        <input className ={authorError?"author textField invalid":"author textField"} type='text' onChange={(e)=>handleAuthorChange(e)} placeholder='John Doe'></input>
                        <span>{authorError}</span>

                        <input className ={descriptionError?"description textField invalid":"description textField"} type='text'   onChange={(e)=>handleDescriptionChange(e)} placeholder="This book is great..I hope.... I didn't read it"></input>
                        <span>{descriptionError}</span>


                        <div>
                        <button className="submitBtn" type="submit">Submit</button>
                        </div>
                    </div>
                    
                </div>
            </form>  
        </div>

    );
}

export default FileUpload;