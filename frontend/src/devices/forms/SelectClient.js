import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import _ from 'lodash';
import React, { Fragment, useEffect } from "react";
import { SERVER } from '../../Configuration';
import { FormContext } from '../../context/FormContext';

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
  const {filter, setFilter} = React.useContext(FormContext);
  var [clients] = useGetClients()


  const handleClientChange = async  (event) => {
    var client = event.target.value;
    var office = '-1'
    setFilter({...filter,client,office});
  };



    return (
    <Fragment>
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
            clients.map(c => c && c.clientId ?  <MenuItem key={c.clientId} value={c.clientId}>({c.clientId})&nbsp;{c.name}</MenuItem> : '')
          : ''
          }
        </Select>
      </Fragment>
  );
}


export const useGetClients = () => {
  const [items, setItems] = React.useState([]);
  
  useEffect(() => {
    if (_.isEmpty(items)){
      load()
    }
  },[items])

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

