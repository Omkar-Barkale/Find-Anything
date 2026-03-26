import {useState} from "react"
import './styles/FileUploader.css'


//file obj has properties file.name, file.size, file.type
export default function FileUploader(props) //we use prop since need to send parent the data of the image selected
{
    const [selectedImage, setSelectedImage] = useState("");
    
    function handleFileChange(e){

        if(e.target.files){ //checks filelist object
            const newFile = e.target.files[0]; //need this as state updates are async, so cant use file
            if((newFile.type == 'image/png' || newFile.type == 'image/jpeg')) //TODO SIZE VALIDATION
            {
                setSelectedImage(newFile ? URL.createObjectURL(newFile) : undefined);
                props.setFile(newFile); //pass file to parent
            } 
            else
            {
                e.target.value = '';
                console.log('Invalid file type');
            }
        }

 
    }
    return(
        <>
            <img id = "imgPreview" src = {selectedImage} width = "100" height = "100"></img>
            <input id = "uploadFile" type = "file" onChange = {handleFileChange} ></input>
        </>
    )
}