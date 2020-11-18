import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import { FormContext } from '../../context/FormContext';
import SelectClient from './SelectClient';
import SelectOffice from './SelectOffice';
import SelectOrder from './SelectOrder';
import SelectRange from './SelectRange';


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

  return (
    <div>
      <FormControl className={classes.formControl}>
        <SelectClient/>
      </FormControl>

      <FormControl className={classes.formControl}>
        <SelectOffice/>
      </FormControl>

      <SelectRange/>

  

      <FormControl className={classes.formControl}>
        <SelectOrder/>
      </FormControl>
  
    </div>
  );
}

