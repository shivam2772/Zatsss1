import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from 'material-ui/transitions/Slide';
import Input from 'material-ui/Input';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  SearchBox: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
    marginLeft: '10px',
  },
  Button: {
    margin: theme.spacing.unit,
  },
  SearchInput: {
    margin: theme.spacing.unit,
    width: '450px',
    height: '45px',
    paddingLeft: '10px',
    marginLeft: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    
  },
});
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
    inputIs:'',
    people:[
      {id:0 , person:'raja'},
      {id:1 , person:'rahul'},
      {id:2 , person:'zunaid'},
      {id:3 , person:'tushar'},
      {id:4 , person:'akash'},
      {id:5 , person:'arvind'},
    ],
    Nid:6,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  handleChange = (event) => {
    let input_text = event.target.value;
    this.setState({inputIs:input_text});
    // console.log("text input "+this.state.inputIs);
  }
  
  render() {
    const { classes } = this.props;
    const call = <div>
                  {
                    this.state.people.map((items)=>{
                      if(items.person===this.state.inputIs){
                        return(
                           <ListItem key={items.id} dense button className={classes.listItem} style={{background: 'beige',marginBottom: '6px'}}>
                            <ListItemText primary={items.person} style={{color: '#ffffff', fontSize: '18px', marginLeft: '10px'}}/>
                          </ListItem> 
                        );
                      }
                    }
                    )
                  }
                </div>;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Direct Messages</Button>
        <Dialog
          className = {classes.dialog}
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Direct Messages
              </Typography>
            </Toolbar>
          </AppBar>
            <div className={classes.SearchBox}>
              <Input
                className={classes.SearchInput}
                placeholder='Search...'
                onChange={this.handleChange}
                inputProps={{
                  'aria-label': 'Description',
                }}
              />
            </div>
            <Divider/>
            <div>
              {call}
            </div>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog)