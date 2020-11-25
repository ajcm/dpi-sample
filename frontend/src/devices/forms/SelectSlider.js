import React, { Fragment, useEffect,useState } from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { FormContext } from '../../context/FormContext';


export default function RangeSlider({form,setForm}) {
  const [range,setRange] = useState([5,15])
  const {filter, setFilter} = React.useContext(FormContext);

  const handleChange = (event, range) => {
    setRange(range)
    setFilter({...filter,range})
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography id="range-slider-demo" gutterBottom>
        Temperature range {range}
      </Typography>
      <Slider
        value={range}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider-demo"
        
      />
    </Box>
  );
}
