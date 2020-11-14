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


const columns = [
  { id: 'device', label: 'Device', minWidth: 100},
  { id: 'client', label: 'Client', minWidth: 100}, 
  { id: 'office', label: 'Office', minWidth: 100},
  { id: 'bsod', label: 'BSOD Count', minWidth: 100},
  { id: 'hardReset', label: 'HR Count', minWidth: 100},
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


  const [items,total,load] = usePagination(page,rowsPerPage)

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

  const clearAllRecords = async () => {

    await deleteAllRecords()

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
       <Button variant="outlined" color="primary" component="span"  onClick={clearAllRecords} style={{marginLeft:'5px'}}>    Clear All     </Button>
       </Paper>
    </Paper>
  );
}


const usePagination =  (page,size) => {

  const [items, setItems] = React.useState([]);
  const [total, setTotal] = React.useState([]);

  useEffect(() => {

    console.log('load',page,size)

    load(page,size)
  },[])


  const load = async (page,size) => {
    try {
      const params = {page,size}
      const response = await axios.get('http://localhost:8080/samples/page',{params})

      if (response && response.data && response.data.content){
        console.log(response.data.content)
        setItems(response.data.content)
        setTotal(response.data.totalElements)
      }else{
        setItems([])
        setTotal(0)
      }
  }catch (error){
    console.log(error)
    setItems([])
    setTotal(0)
  }
  }

  return [items,total, load]

}


const deleteAllRecords = async () => {
  await axios.delete('http://localhost:8080/samples/all')
}
