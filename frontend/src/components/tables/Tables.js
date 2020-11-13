import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import React, { Fragment, useContext } from 'react';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },

  container: {
    maxHeight: 440,
  },

  links: {
    flex:1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'left',
    textAlign: 'left'
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



  export const ItemsTable = ({columns,tableBody}) => {
    const classes = useStyles();
 
    return (
  
      <TableContainer  style={{textAlign: 'left',backgroundColor: '#f2f2f2'}}>
        <Table size="small" style={{textAlign: 'left'}}  aria-label="simple table">
        <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>   
          {tableBody}
          </TableBody>

        </Table>
      </TableContainer>

    );
  }
  
 export const TableItemsBody = ({columns,rows,edit}) => {

    return (
        <Fragment>

          {rows ? (rows.map(row =>
            (<TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => edit(row)} >
                  {columns.map((column) => {

                    const value =  column.getValue ? column.getValue(row[column.id]) : row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                       {value}
                      </TableCell>
                    );
                  })}

          </TableRow> ))) : ''}
        </Fragment>    
    )
}


  

