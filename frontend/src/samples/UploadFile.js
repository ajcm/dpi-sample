import React, {useRef} from 'react'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

  
const FileUploader = ({onSelect}) => {
    const classes = useStyles();


    const handleFileInput = (e) => {
        console.log(e.target.files[0])
        onSelect(e.target.files[0])
    }

    return (
        <div className={classes.root}>
        <input
          accept="*/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileInput}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" >
            Upload
          </Button>
        </label>
        
      </div>
    )

    // return (
    //     <div className="file-uploader">
    //         <input type="file" onChange={handleFileInput}/>

    //     </div>
    // )
}

export default FileUploader