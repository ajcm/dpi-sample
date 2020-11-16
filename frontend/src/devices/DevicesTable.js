import axios from 'axios';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React,{useEffect,useRef,Fragment} from 'react';
import _ from 'lodash';
import DpiGraph from '../devices/DpiGraph'
import TableFilter from './TableFilter'

import {usePagination,doDelete} from '../remote/RemoteData'
import { FormContext } from '../context/FormContext';

const columns = [ 
  { id: 'client', label: 'Client', minWidth: 100}, 
  { id: 'office', label: 'Office', minWidth: 100},
  { id: 'device', label: 'Device', minWidth: 100},
  { id: 'dpi', label: 'DPI', minWidth: 100},
 
];


const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '10px'
  },
  paper: {
 
    margin: '5px'
  },
  paper2: {
    margin: '5px',
    marginTop: '10px'
  },
  container: {
    maxHeight: 440,
  },
  icon : {
    width: 25,
    height: 25,  
  },
  table: {
    "& th": {
      fontWeight: 'bold',
      backgroundColor: 'silver'
    }
  }
});


export default function StickyHeadTable() {
  const classes = useStyles();

  const childRef = useRef();

  const [showGraph, setShowGraph] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [items,total,load] = usePagination('devices/dpi',page,rowsPerPage)

  const [filter, setFilter] = React.useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    load(newPage,rowsPerPage)
  };

  const handleChangeRowsPerPage = (event) => {

    console.log('handleChangeRowsPerPage',event.target.value)
    setRowsPerPage(+event.target.value);
    setPage(0);
    load(0,+event.target.value)
  };


  const reload = () => {
    /* 
    setPage(0);
    load(0,rowsPerPage)
    */


  };

  const onUpdate = (e) => {
    /* 
    setPage(0);
    load(0,rowsPerPage)
    */

   setFilter({e})

    console.log(' new filter',filter)
  };


  const toogleGraph = () => {
    setShowGraph(!showGraph)
    childRef.current.setShowGraph(!showGraph)

    if (!showGraph){
      updateGraph()
    }

  };

  const getGraphData = () => {

    if (_.isEmpty(items)){
      return {}
    }

    const labels =  items.reduce((acc,item) => {
      acc.push(item.device)
      return acc
    },[])

    const data =  items.reduce((acc,item) => {
      acc.push(item.dpi)
      return acc
    },[])


    var response = {}

    const label = 'DPI'
    const borderWidth = 1
    const backgroundColor =  'rgba(255, 99, 99, 150)'

    response.labels = labels
    response.datasets = [{label,data,borderWidth,backgroundColor}]

    return response
  }

  const updateGraph = () => {
    childRef.current.updateData(getGraphData())
  }



  const DeviceTableHead = ()=> ( 
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      
      </TableRow>
    </TableHead>)

  const DeviceTableBody = ()=> ( 
    <TableBody>
              {!_.isEmpty(items) ? items.map((row) => {
                return (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1} >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && value? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                    
                  </TableRow>
                );
              }): ''}
    </TableBody>
  )

  const FormControls = () =>(
    <Paper   elevation={0}  className={classes.paper} >
          <Button variant="outlined" color="primary" component="span"  onClick={reload} style={{marginLeft:'5px'}}>    Update     </Button>
          { showGraph ? 
            <Fragment>
            <Button  variant="contained"   color="primary"  component="span"  onClick={toogleGraph} style={{marginLeft:'15px'}}> Hide Graph </Button>
            <Button variant="contained" color="primary" component="span"  onClick={updateGraph} style={{marginLeft:'5px'}}> Update Graph </Button>
            </Fragment>
          :
          <Button  variant="contained"   color="primary"  component="span"  onClick={toogleGraph} style={{marginLeft:'15px'}}> Show Graph </Button>
          }
    </Paper>
  )

const FormFilters = ({onUpdate}) =>(
    <Paper   elevation={0}  className={classes.paper} >
      <TableFilter onUpdate={onUpdate}/>     
    </Paper>
  )


  return (
    <Paper className={classes.root}>
      <FormFilters onUpdate={onUpdate} />
      <TableContainer className={classes.container}>
        <Table  size="small" stickyHeader aria-label="table" className={classes.table}>
          <DeviceTableHead/>
          <DeviceTableBody />      
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <FormControls/>

      <Paper  elevation={0}  className={classes.paper2}>
       <DpiGraph  ref={childRef} />
      </Paper>
  
    </Paper>
    
  );
}

