import {useState} from "react"
import './styles/FileUploader.css'


//file obj has properties file.name, file.size, file.type
export default function FileUploader(props) //we use prop since need to send parent the data of the image selected
{
    const [selectedImage, setSelectedImage] = useState("");
    
    function handleFileChange(e)
    {

        if(e.target.files)//checks filelist object
        { 
            const newFile = e.target.files[0]; //need this as state updates are async, so cant use file

            if (newFile.size > 1024 * 1024) {
                e.target.value = '';
                props.setAvatarError("File must be under 1 MB");
                return;
            }

            if((newFile.type == 'image/png' || newFile.type == 'image/jpeg')) 
            {
                setSelectedImage(newFile ? URL.createObjectURL(newFile) : undefined);
                props.setFile(newFile); //pass file to parent
                props.setAvatarError("");
            } 
            else
            {
                e.target.value = '';
                console.log('Only png and jpeg files are supported');
                props.setAvatarError("Only png and jpeg files are supported");
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