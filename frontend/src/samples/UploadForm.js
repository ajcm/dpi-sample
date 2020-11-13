import React,{Fragment,useState} from "react";
import UploadFile from './UploadFile'

import {postData} from '../remote/RemoteData'

const UploadForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);


    const onSelect = (file) => {

        console.log("Selected file:",file)

        if (file){
            setSelectedFile(file)
        }
        
    }

    const submitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();
     
        formData.append("file", selectedFile);


        if (!selectedFile){
            alert("No File selected!")
        }

        try {
            await postData('http://localhost:8080/samples/upload',formData)
            alert('OK')
        
        }catch (error){ 
            console.log("error",error)
            alert('Error sending data: '+error)
        }
        

    
    }

  return (  
    <Fragment>
    <h4>Upload sample</h4>
      <form>
      <UploadFile onSelect={onSelect} />
      <button onClick={submitForm}>Submit</button>
      </form>

    </Fragment>
  );
};

export default UploadForm