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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [client, setClient] = React.useState('-1');
  const [office, setOffice] = React.useState('-1');

  const [clients] = useGetClients('business/clients')

  const handleClientChange = (event) => {
    setClient(event.target.value);
  };


  useEffect(() => {

    console.log("Client changed to ",client )
   
  },[client])

  

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Client</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={client}
          onChange={handleClientChange}>
             <MenuItem value="-1">
            <em>ALL</em>
          </MenuItem>
          { !_.isEmpty(clients) ? 
            clients.map(c => <MenuItem key={c.clientId}value={c.clientId}>{c.name}</MenuItem>)
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

    <div>
    <Button  variant="contained"   color="primary"  component="span"  style={{marginBottom:'15px'}}> Update
     </Button>
    </div>


    </div>
  );
}

const SERVER = 'http://localhost:8080/'

export const useGetClients = (url) => {
  const [items, setItems] = React.useState([]);
  
  useEffect(() => {
    load()
  },[])

  const load = async () => {
    try {

      const response = await axios.get(SERVER +url)      
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
