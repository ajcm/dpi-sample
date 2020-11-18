import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});



export default function DiscreteSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState([0,5]);

  //const {filter, setFilter} = React.useContext(FormContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-small-steps" gutterBottom>
        DPI
      </Typography>
      <Slider
        onChange={handleChange}
        defaultValue={5}
        aria-labelledby="discrete-slider-small-steps"
        step={1}
        marks
        min={0}
        max={10}
        valueLabelDisplay="auto"
        value={value}
      />
    </div>
  );
}
