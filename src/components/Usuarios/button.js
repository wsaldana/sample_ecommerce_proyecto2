import React from 'react';
import './button.css'
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


function Reports() {
  const classes = useStyles();




  return (
   
     <div className = "App">
       <Fab color = "secondary" aria-label = "send" align="center">
            <SendIcon className={classes.extendedIcon}/>
            
       </Fab>
     </div>

    
  );
}

export default Reports;