import FormControl from '@material-ui/core/FormControl';
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

  var [offices,loadOffices] = useGetOffices()

  const handleOfficeChange = (event) => {
    var office = event.target.value;
    setFilter({...filter,office});
  };


  /** Workaround: 
   * having some issues when setting the client and getting the offices at the same time
   * 
   */
  useEffect(() => {
    loadOffices_(filter.client)
  },[filter.client])


  const loadOffices_ = async (client) =>   {
    if (client != '-1'){
      await loadOffices(client)
    }

  }

  return (
    <Fragment>

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
            offices.map(c =>  <MenuItem key={c.officeId} value={c.officeId}>{c.name}</MenuItem>)
          : ''
          }
        </Select>

    </Fragment>
  );
}


export const useGetOffices = () => {
  const [items, setItems] = React.useState([]);
  
  const load = async (clientId) => {
    try {
      const response = await axios.get(SERVER +'business/offices/'+clientId)      
      setItems(response.data ?  response.data : [])
    }catch (error){
      console.log(error)
    }
  }

  return [items,load]
}


