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

  const handleOrderChange= (event) => {
    var order = event.target.value;
    setFilter({...filter,order});
  };


  return (
    <Fragment>
    <InputLabel id="demo-simple-select-label">Order</InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value= { filter && filter.order ? filter.order : 'ASC'}
          onChange={handleOrderChange}>
          <MenuItem value="ASC">
            <em>Ascending</em>
          </MenuItem>
          <MenuItem value="DESC">
            <em>Descending</em>
          </MenuItem>         
        </Select>
    </Fragment>
  );
}


