import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import Title from '../components/Title';

import UploadForm from '../samples/UploadForm'

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Samples</Title>
      <UploadForm/>
    </React.Fragment>
  );
}
