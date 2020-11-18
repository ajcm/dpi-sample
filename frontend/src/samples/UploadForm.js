import React,{Fragment,useState,useRef} from "react";
import UploadFile from './UploadFile'
import {doPost} from '../remote/RemoteData'
import SampleTable from './SampleTable'

const UploadForm = () => {
    const childRef = useRef();

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
            refresh();
            alert('Loaded ' +total  + ' items' )
        }catch (error){ 
            console.log("error",error)
            alert('Error: '+error.response.data)
        }
    }

    const refresh = () => {
        childRef.current.refresh()
      }

  return (  
    <Fragment>   
        <UploadFile onSelect={onSelect} />
        <SampleTable ref={childRef} />
    </Fragment>
  );
};

export default UploadForm