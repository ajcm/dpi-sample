import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import _ from 'lodash';
import {get}  from '../remote/RemoteData'

const columns = [
  { id: 'device', label: 'Id', minWidth: 170},
  { id: 'customer', label: 'Title', minWidth: 100}, 
  { id: 'office', label: 'Owner', minWidth: 100}
 
];




const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '10px'
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


  const items = usePagination()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };




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
            {!_.isEmpty(items) ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


const usePagination = () => {

  return get('http://localhost:8080/samples/all')


}



