import React,{Fragment,useState} from "react";
import UploadFile from './UploadFile'
import Button from '@material-ui/core/Button';

import {doPost} from '../remote/RemoteData'
import SampleTable from './SampleTable'

const UploadForm = () => {

    const onSelect = (file) => {
        if (file){
            submitForm(file)
        }        
    }

    const submitForm = async (file) => {      
        const formData = new FormData();
        formData.append("file", file);

        try {
            const result  = await doPost('samples/upload',formData)
            const total  = result.data.parsed
            alert('Loaded ' +total  + ' items' )
        }catch (error){ 
            console.log("error",error)
            alert('Error: '+error.response.data)
        }
    }

  return (  
    <Fragment>   
        <UploadFile onSelect={onSelect} />
        <SampleTable/>
    </Fragment>
  );
};

export default UploadForm