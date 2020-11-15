import React, { useEffect, useState } from "react";
import axios from 'axios';

const SERVER = 'http://localhost:8080/'
export const doPost = async  (url,data) =>{
  return await axios.post(SERVER+url, data)
}

export const _get = async  (url) =>{
  return await axios.get(url)
}

export const doDelete = async  (url) =>{
  return await axios.delete(SERVER+url)
}




export const usePagination = (url,page,size) => {

  const [items, setItems] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  useEffect(() => {
    load(page,size)
  },[])


  const load = async (page,size) => {
    try {
      const params = {page,size}
      const response = await axios.get(SERVER +url,{params})

      if (response && response.data && response.data.content){
        console.log(response.data.content)
        setItems(response.data.content)
        setTotal(response.data.totalElements)
      }else{
        setItems([])
        setTotal(0)
      }
  }catch (error){
    console.log(error)
    setItems([])
    setTotal(0)
  }
  }

  return [items,total, load]
}
