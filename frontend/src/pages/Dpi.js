import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import Title from '../components/Title';
import DeviceTable from '../devices/DevicesTable'
import { FormContext } from '../context/FormContext';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Dpi() {
  const classes = useStyles();

  const [filter, setFilter] = React.useState({});
  const [client, setClient] = React.useState('-1');


  return (
    <React.Fragment>
      <Title>DPI</Title>
      <FormContext.Provider value={{filter,setFilter,client, setClient}}>
      <DeviceTable/>
      </FormContext.Provider>

    </React.Fragment>
  );
}
