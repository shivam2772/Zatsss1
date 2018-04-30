import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import Radio from 'material-ui/Radio';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  bottomNav:{
    position: 'absolute',
    clear: 'both',
    margin: 0,
    bottom: 0,
  },
});

class CreateChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {list:{
        value:'',
        val:'',
    }};

  }

  handleChange = (event) => {
    this.setState({
        list:{value: event.target.value}
      });
    console.log(event.target.value);
  }
  handlePurpose = (event) => {
      this.setState({
          list:{val : event.target.value}
      });
  }
 
  handleSubmit = (event) => {
    event.preventDefault();
   
    console.log("x "+this.state.list.value);
    console.log("list item "+this.state.list.val);
    console.log("list "+this.state.list);
    this.props.channels(this.state.list);

    // else
    // alert("Write a Channel Name First?");
  }

  render() {
    const { classes } = this.props;
    return (
      <fragment>
        
        <Paper className={classes.root} elevation={4}>
          <form onSubmit={this.handleSubmit}>
            <Input
              placeholder="Purpose"
              className={classes.input}
              inputProps={{ 'aria-label': 'Description', }}
              value={this.state.value} onChange={this.handleChange} />
            <br />
            <Input 
                placeholder="Enter Channel name"
                className={classes.input}
                inputProps={{ 'aria-label': 'Description', }}
                val={this.state.val} onChange={this.handlePurpose} />
            <br />
            <button type="submit">Submit</button>
          </form>
          
          </Paper>
        
         
      </fragment>
    );
  }
}

CreateChannel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateChannel);