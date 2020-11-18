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

  const handleFromChange= (event) => {
    var from = event.target.value;
    setFilter({...filter,from});
  };

  const handleToChange= (event) => {
    var to = event.target.value;
    setFilter({...filter,to});
  };


  return (
    <Fragment>

      <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">From</InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value= { filter && filter.from ? filter.from : '-1'}
          onChange={handleFromChange}>
          <MenuItem value="-1"><em>NONE</em></MenuItem>
          <MenuItem value="0">0</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="7">7</MenuItem>
          <MenuItem value="8">8</MenuItem>
          <MenuItem value="9">9</MenuItem>   
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">To</InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value= {filter && filter.to ? filter.to : '-1'}
          onChange={handleToChange}>
          <MenuItem value="-1"><em>NONE</em></MenuItem>          
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="7">7</MenuItem>
          <MenuItem value="8">8</MenuItem>
          <MenuItem value="9">9</MenuItem>   
          <MenuItem value="10">10</MenuItem>   
        </Select>
      </FormControl>
      </Fragment>
  );
}

