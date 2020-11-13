import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React,{useState,Fragment} from 'react';
import {useParams} from "react-router-dom";
import { useRemote } from '../shared/remote/RemoteData';
import { ERROR_EMPTY_MSG, getGetInput, getSetInput,filterFields } from '../forms/FormUtils';
import { TextFieldExtended } from '../forms/ExtendedForm';
import { FormRow } from '../shared/forms/FormUtils';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import { postTo } from '../shared/remote/Utils';



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


const Content = ({guid}) => {
  const classes = useStyles();

  const [data,setData,load] = useRemote('CMS-API','cms/detail',{guid})

  const [errorsState,setErrorsState] = useState({})
  const [formState,setFormState] = useState({})
  
  
  const setFormField = getSetInput(data,setData)
  const getFormField = getGetInput(data)

  const getFormErrors = getGetInput(errorsState)
  const setErrors = (errors) => setErrorsState(errors)

  console.log('guid',guid )


  const update = (props) => {

    const {title,text} = data
    const fields = {title,text} 

    postTo ('CMS-API','cms/update',{guid,fields},(error,response) => {          
      if(error){
        console.log('error:',error)      
      }else{                    
        console.log('Ok')                        
      }
    }
  )

}


  if (!data)
    return (<p>Loading</p>) 


    return (<Fragment>

      <TableContainer>
        <Table size="small" style={{textAlign: 'left'}}  aria-label="simple table"> 
        <TableBody>     
      
    
        <FormRow label="Title">
        <TextFieldExtended fullWidth name="title"   fullWidth get={getFormField} set={setFormField} geterrors={getFormErrors}   variant="outlined" />
        </FormRow> 

        <FormRow label="Text">
        <TextFieldExtended fullWidth name="text"   fullWidth get={getFormField} set={setFormField} geterrors={getFormErrors}  multiline rowsMax={4}   variant="outlined" />
        </FormRow> 
      
        </TableBody>
        </Table>
      </TableContainer>


      <Grid container spacing={3} className={classes.addressContainer}>

      <Grid item xs={12} >         
        <Button type="submit" variant="contained" color="primary" className={classes.submit}
        onClick={update}>
        Update
        </Button>
      </Grid>
      </Grid>    
      </Fragment>)

}

export default Content