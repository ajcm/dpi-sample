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
import React,{useEffect} from 'react';
import _ from 'lodash';

import {usePagination,doDelete} from '../remote/RemoteData'


const columns = [
  { id: 'device', label: 'Device', minWidth: 100},
  { id: 'dpi', label: 'DPI', minWidth: 100},

  { id: 'bsod', label: 'BSOD Count', minWidth: 100},
  { id: 'hardResets', label: 'HR Count', minWidth: 100},
  { id: 'bootSpeed', label: 'Boot Speed', minWidth: 100},
  { id: 'logonDuration', label: 'Logon Duration', minWidth: 100},
  { id: 'cpuUsage', label: 'CPU', minWidth: 100},
  { id: 'memoryUsage', label: 'Memory', minWidth: 100},
  { id: 'systemFreeSpace', label: 'Free Space', minWidth: 100},

   
];




const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '10px'
  },
  paper: {
 
    margin: '5px'
  },
  container: {
    maxHeight: 440,
  },
  icon : {
    width: 25,
    height: 25,  
  }
});

export default function StickyHeadTable() {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const [items,total,load] = usePagination('devices/dpi',page,rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    load(newPage,rowsPerPage)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    load(0,+event.target.value)
  };


  const reload = (event, newPage) => {
    setPage(0);
    load(0,rowsPerPage)
  };




  console.log('items',items)


  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table  size="small" stickyHeader aria-label="sticky table">
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
            
          </TableHead>
          <TableBody>
            {!_.isEmpty(items) ? items.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
      <Paper   elevation={0}  className={classes.paper} >
       <Button variant="outlined" color="primary" component="span"  onClick={reload}>    Refresh     </Button>
       <Button variant="outlined" color="primary" component="span"  style={{marginLeft:'5px'}}>    Process DPI    </Button>
       </Paper>
    </Paper>
  );
}

