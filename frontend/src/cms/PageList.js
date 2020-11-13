import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useRef } from "react";
import PageTable from './PageTable';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },

  paper: {
    width: "100%",
    flexGrow: 1,
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '10px',
 //   minHeight: '90vh'

  },


  container: {
    maxHeight: 440,
  },

  links: {
    flex:1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'left',
    textAlign: 'left',
  
  },

  
  links2: {
    flex:4,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'left',
    textAlign: 'left'
  },

  links3: {
    display: 'flex',
    flex: 4,
    justifyContent: 'flex-end',
  },
});


const getDateToString = (date) => (new Date(date)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");



  const columns = [
    { id: 'id', label: 'Id', minWidth: 170,  getValue: (value) => value.substring(value.indexOf('#')+1,value.length) },
   
    { id: 'ctime', label: 'Created', minWidth: 170, getValue: (value) =>getDateToString(value)  },
    { id: 'mtime', label: 'Last Mod.', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 170, 'align': 'right' },
  ];


  
  const OrdersComponent = () => {

    const childRef = useRef();

    const error = (err) => {
 //     alert(err)
    }
  
    const edit = (children) => {
  //    childRef.current.setChildren(children.id)
    }
    
    return (
      <Fragment>
      <PageTable />

   
      </Fragment>
    )

  }

export default OrdersComponent
