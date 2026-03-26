import {useState} from "react"
import './styles/FileUploader.css'


//file obj has properties file.name, file.size, file.type
export default function FileUploader()
{
    const [file, setFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");

    function handleFileChange(e){
        if(e.target.files){ //checks filelist object
            const newFile = e.target.files[0]; //need this as state updates are async, so cant use file
            setFile(newFile);
            setSelectedImage(newFile ? URL.createObjectURL(newFile) : undefined);
        }
    }
    return(
        <>
            <img id = "imgPreview" src = {selectedImage} width = "100" height = "100"></img>
            <input id = "uploadFile" type = "file" onChange = {handleFileChange}></input>
        </>
    )
}