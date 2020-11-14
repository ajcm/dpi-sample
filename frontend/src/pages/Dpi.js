import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import Title from '../components/Title';
import DeviceTable from '../devices/DevicesTable'



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>DPI</Title>
      <DeviceTable/>
    </React.Fragment>
  );
}
