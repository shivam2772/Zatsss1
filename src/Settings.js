import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import Dialog, {
  DialogActions,
  DialogContent,
  //DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Settings extends React.Component {
  state = {
    mobileOpen: false,
    auth: true,
    anchorEl: null,
    open: false,
    texts:'',
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    console.log("hello "+this.props.text);
    this.setState({ anchorEl: null });
    this.setState({ open: false });
  };
  handleSearch = (event) => {
    this.state.texts = event.target.value;
    this.setState({texts: event.target.value});
  };
  handleClose2 = () => {
    console.log("hello "+this.state.texts);
    this.props.meth(this.state.texts);
    this.setState({ anchorEl: null });
    this.setState({ open: false });
  };
  
  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <div>
          <i class="material-icons"
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >settings</i>
        </div>
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={this.handleClose}
        >
            <MenuItem onClick={this.handleClickOpen}>Invite new member</MenuItem>
            <MenuItem onClick={this.props.signOut}>Sign Out</MenuItem>
        </Menu>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Invite others to #General</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Enter Name"
                type="name"
                fullWidth
                onChange = {this.handleSearch.bind(this)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose2} color="primary">
                Invite
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Settings);