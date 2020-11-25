import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { Fragment, useState } from "react";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function SimpleSelect({form,setForm}) {
  const classes = useStyles();
  const [device,setDevice] = useState('')


  const change = (event) => {
    const device = event.target.value;
    setDevice(device)
    setForm({...form,device})
  }

  return (
    <Fragment>  
    <TextField id="standard-required" label="Device" value={device}  onChange={change}  />      
    </Fragment>
  );
}



