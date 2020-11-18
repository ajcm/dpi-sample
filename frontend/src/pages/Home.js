import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import Title from '../components/Title';
import Typography from '@material-ui/core/Typography';
import { SERVER } from '../Configuration'

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

  console.log(process.env)

  return (
    <React.Fragment>
      <Title>Home</Title>
      <UserWelcome />
    </React.Fragment>
  );
}


const UserWelcome = () =>  {  
  
 
  return (
   <React.Fragment>
      <Typography variant="body1" gutterBottom>Hello, this is a sample React application.</Typography>

      <Typography variant="body1" gutterBottom><b>Samples</b> - Uploads a CSV file and lists the samples.</Typography>

      <Typography variant="body1" gutterBottom><b>DPI</b> - Table and filter for DPI values.</Typography>

      <p></p>

      <Typography variant="body2" gutterBottom>Using backend at {SERVER} </Typography>
      <Typography variant="body2" gutterBottom>(default http://localhost:8080) </Typography>

    </React.Fragment>
  );
}


   