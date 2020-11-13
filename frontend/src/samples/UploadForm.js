import React,{Fragment,useState} from "react";
import UploadFile from './UploadFile'
import Button from '@material-ui/core/Button';

import {postData} from '../remote/RemoteData'
import SampleTable from './SampleTable'

const UploadForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);


    const onSelect = (file) => {

        console.log("Selected file:",file)

        if (file){
          //  setSelectedFile(file)
            submitForm(file)
        }
        
    }

    const submitForm = async (file) => {
      //  e.preventDefault();

        const formData = new FormData();
     
        formData.append("file", file);




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
    <SampleTable/>
    <h4>Upload sample</h4>
    <UploadFile onSelect={onSelect} />
    </Fragment>
  );
};

export default UploadForm