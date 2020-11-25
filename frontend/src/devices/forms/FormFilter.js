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

function Forms(props) {
  const classes = useStyles();

  const [form,setForm] = useState({})
 // const {filter, setFilter} = React.useContext(FormContext);

  // useEffect(() => {
  //   setFilter({...form})
  // },[form])

  const [filter, setFilter] = React.useState({});

  return (
    <div>
    
      <FormControl className={classes.formControl}>
        <SelectSlider  />
      </FormControl>
  
      <FormControl className={classes.formControl}>
        <SelectDevice   />
      </FormControl>

  
    </div>
  );
}


export default function SimpleSelect(props) {
  const classes = useStyles();

  //const [form,setForm] = useState({})
 // const {filter, setFilter} = React.useContext(FormContext);



  const [filter, setFilter] = React.useState({});

  useEffect(() => {
    console.log(filter)
  },[filter])

  return (
    <div>
      <FormContext.Provider value={{filter,setFilter}}>
        <Forms/>
      </FormContext.Provider>  
    </div>
  );
}


 