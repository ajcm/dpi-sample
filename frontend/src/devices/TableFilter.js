import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import DpiSlider from './DpiSlider'
import axios from 'axios';
import _ from 'lodash';
import { FormContext } from '../context/FormContext';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const SERVER = 'http://localhost:8080/' 

export default function SimpleSelect() {
  const classes = useStyles();
  //const [filter, setFilter] = React.useState({'client':'-1'});
  const {filter, setFilter} = React.useContext(FormContext);

  var [clients] = useGetClients()
  var [offices,loadOffices] = useGetOffices()

  const handleClientChange = async  (event) => {
    var client = event.target.value;
    var office = '-1'
    setFilter({...filter,client,office});

  };

  useEffect(() => {

    loadOO(filter.client)

   
  },[filter])

  const handleOfficeChange = (event) => {
    var office = event.target.value;
  setFilter({...filter,office});


  };

  const loadOO = async (client) =>   {

    if (client != '-1'){
      await loadOffices(client)
    }


  }





  

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Client</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value= { !_.isEmpty(clients) && filter && filter.client ? filter.client : '-1'}
          onChange={handleClientChange}>
          <MenuItem value="-1">
            <em>ALL</em>
          </MenuItem>
          { !_.isEmpty(clients) ? 
            clients.map(c => c && c.clientId ?  <MenuItem key={c.clientId} value={c.clientId}>{c.clientId}</MenuItem> : '')
          : ''
          }
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Office</InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value= { !_.isEmpty(offices) && filter && filter.office ? filter.office : '-1'}
          onChange={handleOfficeChange}>
          <MenuItem value="-1">
            <em>ALL</em>
          </MenuItem>
          { !_.isEmpty(offices) ? 
            offices.map(c =>  <MenuItem key={c.officeId} value={c.officeId}>{c.officeId}</MenuItem>)
          : ''
          }
        </Select>
     
      </FormControl>
      <FormControl className={classes.formControl}>
        <DpiSlider/>
      </FormControl>
    </div>
  );
}


export const useGetClients = () => {
  const [items, setItems] = React.useState([]);
  
  useEffect(() => {
    if (_.isEmpty(items)){
      load()
    }
  },[])

  const load = async () => {
    try {

      const response = await axios.get(SERVER+ 'business/clients' )      
      console.log(response)

      if (response && response.data ){
        setItems(response.data)    
      }else{
        setItems([])    
      }

    }catch (error){
      console.log(error)
    
    }
  }

  return [items]
}


export const useGetOffices = () => {
  const [items, setItems] = React.useState([]);
  

  const load = async (clientId) => {
    try {

      console.log('offcies from ' +clientId )

      const response = await axios.get(SERVER +'business/offices/'+clientId)      
      setItems(response.data ?  response.data : [])

    }catch (error){
      console.log(error)
    
    }
  }

  return [items,load]
}


