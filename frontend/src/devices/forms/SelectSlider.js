import React, { Fragment, useEffect,useState } from "react";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';



export default function RangeSlider({form,setForm}) {
  const [range,setRange] = useState([5,15])

  const handleChange = (event, range) => {
    setRange(range)
    setForm({...form,range})
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
