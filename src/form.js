import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';


const styles = theme => ({
    adornmentamount: {
        width:'1080px',
        marginTop:'53%',
        paddingleft:'10px;',
        
        position:'relative',
        
    },
});


function Form(props) {
    const { classes } = props;
  
    return (
      <div className={classes.root}>
<InputLabel htmlFor="adornment-amount"></InputLabel>

         <Input
           className = {classes.adornmentamount}
           placeholder="enter the message"
           

         
           startAdornment={<InputAdornment position="start"></InputAdornment>
       
   }

         />
             <i class="material-icons">send</i>
             </div>
}

export default withStyles(styles)(Form);
