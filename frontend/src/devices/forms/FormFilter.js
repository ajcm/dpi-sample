import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useEffect,useState } from "react";
import { FormContext } from '../../context/FormContext';
import SelectClient from './SelectClient';
import SelectOffice from './SelectOffice';
import SelectOrder from './SelectOrder';
import SelectRange from './SelectRange';
import SelectDevice from './SelectDevice';
import SelectSlider from './SelectSlider';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Forms(props) {
  const classes = useStyles();

  return (
    <div>
    
        
    <FormControl className={classes.formControl}>
        <SelectClient  />
      </FormControl>

        
      <FormControl className={classes.formControl}>
        <SelectOffice  />
      </FormControl>

      <FormControl className={classes.formControl}>
        <SelectSlider  />
      </FormControl>
  
      <FormControl className={classes.formControl}>
        <SelectDevice   />
      </FormControl>

  
    </div>
  );
}

 