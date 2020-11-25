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


export default function SimpleSelect(props) {
  const classes = useStyles();

  const [form,setForm] = useState({})

  useEffect(() => {

    console.log(form)

  },[form])


  return (
    <div>
      <FormControl className={classes.formControl}>
        <SelectSlider form={form} setForm={setForm} />
      </FormControl>
  
      <FormControl className={classes.formControl}>
        <SelectDevice  form={form} setForm={setForm} />
      </FormControl>
  
    </div>
  );
}

