import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import Title from '../components/Title';
import Typography from '@material-ui/core/Typography';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import WebIcon from '@material-ui/icons/Web';
import EmailIcon from '@material-ui/icons/Email';
import Link from '@material-ui/core/Link';

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
    <Title>About</Title>
      <Typography variant="body1" gutterBottom>Assignment by </Typography>
      <Typography variant="body2" gutterBottom>Armando Marques</Typography>
      <div> 
        <Link href="mailto:ajcmarques@icloud.com"><EmailIcon fontSize="large" /> </Link>
        <Link href="https://kitboga.net"><WebIcon  fontSize="large"  />   </Link>
        <Link href="https://www.linkedin.com/in/ajcmarques/"><LinkedInIcon fontSize="large"  />  </Link>  </div>
      
    </React.Fragment>
  );
}


   