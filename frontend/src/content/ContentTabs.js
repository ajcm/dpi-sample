import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { Fragment } from 'react';
import ContentEdit from './ContentEdit'
import ContentPreview from './ContentPreview'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
 //   marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    paddingLeft:theme.spacing(1),
    minHeight: '50vh',
  },
  avatar: {
    margin: theme.spacing(1),
   // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
      <Fragment> {children}</Fragment>
       
      )}
    </div>
  );
}


export default function ContentTabs({guid}) {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Edit" />
        <Tab label="Preview"  />
        <Tab label="Other" />
      </Tabs>

      <TabPanel value={value} index={0}>    
      <Paper className={classes.paper}>  
        <ContentEdit guid={guid}/>
      </Paper>  
      </TabPanel>

      <TabPanel value={value} index={1}>
      <Paper className={classes.paper}>  
        <ContentPreview guid={guid}/>        
      </Paper>  

      </TabPanel>
      
      <TabPanel value={value} index={2}>
      <Paper className={classes.paper}>  
        <p>Other: {guid}</p>
      </Paper>  
  
      </TabPanel>
    </Paper>
   
    </Fragment>
  );
}
