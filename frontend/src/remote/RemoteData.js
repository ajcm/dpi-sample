import React, { useEffect, useState } from "react";
import { postTo } from './Utils';



export const useGetRemoteData = (api,service,section) =>{
    const [id, setId] = React.useState();
    const [data, setData] = useState({});

    useEffect(() => {

      console.log("id ",id)
    if(id){
      load()
    }
    },[id])


    const load = () => {
        const action = 'get'

        postTo (api,service,{action,id,section}, 
          (error,response) => {
          
            if(error){
              console.log('error:',error)      
            }else{      
              if(response && response.Item){
                setData(response.Item)
              }           
          }
          }
        )
      }

     
    return [data,id,setId,load]
  }

  export const useRemoteData = (api,service,section) =>{
    const [id, setId] = React.useState();
    const [data, setData] = useState({});

    useEffect(() => {

      console.log("id ",id)
    if(id){
      load()
    }
    },[id])

  const post = (action,fields,callback) => {                
      postTo(api,service,{action,id,section,fields},callback)                         
  }

    const load = () => {
        const action = 'get'

        postTo (api,service,{action,id,section}, 
          (error,response) => {
          
            if(error){
              console.log('error:',error)      
            }else{      
              if(response && response.Item){
                setData(response.Item)
              }           
          }
          }
        )
      }

 
     
    return [data,id,setId,load,post]
  }


  export const useRemoteQuery = (api,service,payload) =>{

    const [data, setData] = useState({});

    useEffect(() => {
      load()
    },[])


    const load = () => {

      console.log(payload)

        postTo (api,service,payload, 
          (error,response) => {
          
            if(error){
              console.log('error:',error)      
            }else{                    
                setData(response)
                         
          }
          }
        )
      }

     
    return [data,load]
  }

  export const useRemote = (api,service,payload) =>{

    const [data, setData] = useState({});

    useEffect(() => {
      load()
    },[])


    const load = () => {

        postTo (api,service,payload, 
          (error,response) => {          
            if(error){
              console.log('error:',error)      
            }else{                    
                setData(response)
                         
          }
          }
        )
        
      }

     
    return [data,load]
  }


  export const useRemoteGetItem = (api,service,scope,id) => (useRemote(api,service,{'action':'get',api,service, scope,id}))
  export const useRemoteQueryItems = (api,service, scope) => (useRemote(api,service,{'action':'list',api,service,scope}))