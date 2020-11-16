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

export default function SimpleSelect({onUpdate}) {
  const classes = useStyles();
  //const [filter, setFilter] = React.useState({'client':'-1'});
  const {filter, setFilter} = React.useContext(FormContext);

  //const [clients, setClients] = React.useState([]);

  var [clients] = useGetClients()

  const handleClientChange = (event) => {

    var client = event.target.value;

    setFilter({...filter,client});

    // if (client != '-1'){
    //   loadOffices(client)
    // }
   // onUpdate(client)
  };

  const handleOfficeChange = (event) => {

  };


  // useEffect(() => {

  //   console.log("filter  ",filter )

  //   var clients = [{"clientId": "2","name":"FFFF"}]

  //   setClients(clients);

   
  // },[])


  const loadOffices = async (clientId) =>{

    const response = await axios.get(SERVER +'business/offices/'+clientId)      
    console.log(response)

   
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
     
      </FormControl>
      <FormControl className={classes.formControl}>
        <DpiSlider/>
      </FormControl>
    </div>
  );
}

const SERVER = 'http://localhost:8080/' + 'business/clients'

export const useGetClients = () => {
  const [items, setItems] = React.useState([]);
  
  useEffect(() => {
    load()
  },[])

  const load = async () => {
    try {

      const response = await axios.get(SERVER )      
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

