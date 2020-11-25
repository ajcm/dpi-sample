import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import _ from 'lodash';
import React, { Fragment, useEffect,useState } from "react";
import { SERVER } from '../../Configuration';
import { FormContext } from '../../context/FormContext';
import TextField from '@material-ui/core/TextField';

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
  const [device,setDevice] = useState('')
  const {filter, setFilter} = React.useContext(FormContext);

  const change = (event) => {
    const device = event.target.value;
    setDevice(device)
    setFilter({...filter,device})
  }

  return (
    <Fragment>  
    <TextField id="standard-required" label="Device" value={device}  onChange={change}  />      
    </Fragment>
  );
}



