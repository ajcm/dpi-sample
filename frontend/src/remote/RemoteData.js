import React, { useEffect, useState } from "react";
import axios from 'axios';
import _ from 'lodash';
import { SERVER } from '../Configuration'

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
    load(page,size,{})
  },[])


  const load = async (page,size,filter) => {
    try {
      const params = {page,size}

      if (filter){
        getFilterParams(params,filter)
      }

      const response = await axios.get(SERVER +url,{params})

      if (response && response.data && response.data.content){
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


const getFilterParams = (params,filter) => {

    if (!_.isEmpty(filter.client) && !_.isEqual(filter.client,"-1")){
      params ['clientId']  = filter.client
    }

    if (!_.isEmpty(filter.office) && !_.isEqual(filter.office,"-1")){
      params ['officeId']  = filter.office
    }

    if (!_.isEmpty(filter.device)){
      params ['deviceId']  = filter.device
    }

    if (!_.isEmpty(filter.order)){
      params ['sort']  = 'dpi,'+filter.order
    }

    if (!_.isEmpty(filter.from) && !_.isEqual(filter.from,"-1")){
      params ['from']  = filter.from
    }

    if (!_.isEmpty(filter.to) && !_.isEqual(filter.to,"-1")){
      params ['to']  = filter.to
    }

}
