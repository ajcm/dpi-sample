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
      <Typography variant="h6" gutterBottom>Notes</Typography>
      <Typography variant="body2" gutterBottom>
      One of the very necessary improvements in the frontend is to replace useContext with Redux, although the first is simpler and easier to use there were unexpected issues with the use of the context hook.
      The overall performance is not good and it causes flickering in the components, also there is an out-of-focus event that conflicts with Input elements as a TextField or Slider.
      <br/><br/>
      The application would benefit with a better way to retrieve and cache clients and offices list,
      as the first is being retrieved in every rendering
      <br/><br/>
      User feedback and confirmation could be improved in the Samples page.
      <br/><br/>
      Filter controls for DPI are slow performance and would require a tweak, the range could be implements with a Slider, however this was not working properly due to Context issues.
      <br/><br/>
      Codes for client and offices need to be replaced by the proper name but this will require some sort of cache solution to avoid performance degradation
      <br/><br/>
      Finally, if this frontend was released to the client it would require some sort of integrations tests, not being too familiar with such requirement would demand a more extensive research to find the best solution.

      </Typography>
      <p></p>

      <Typography variant="body2" gutterBottom>Using backend at {SERVER} </Typography>
      <Typography variant="body2" gutterBottom>(default http://localhost:8080) </Typography>

    </React.Fragment>
  );
}


   