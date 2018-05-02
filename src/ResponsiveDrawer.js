import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import { ListItem, ListItemSecondaryAction, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarIcon from '@material-ui/icons/Star';
import TemporaryDrawer from './SideBar';
import Settings from './Settings';
import Grid from 'material-ui/Grid';
import * as firebase from 'firebase';
import List from 'material-ui/List';
import history from './history';
import FullScreenDialog from './fullscreendialog';
import CreateChannel from './CreateChannel';
import Icon from 'material-ui/Icon';
import green from 'material-ui/colors/green';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: green[200],
    },
  },

  adornmentamount: {
   width:'80%',
   marginTop:'47%',
   paddingleft:'10px;',
   
   position:'relative',
   
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
  upper:{
    display:'flex',
  },
  navi:{
    display:'flex',
  }
});

class ResponsiveDrawer extends React.Component {

  constructor(props){
    super(props);
  this.state = {
    mobileOpen: false,
    auth: true,
    anchorEl: null,
    open: false,
    direction: 'row',
   justify: 'space-between',
   alignItems: 'flex-start',
   members:[],
   users:[],
   channels: [],
   searchTerm:'',
   nextId:0,
   openCreateChannel:false,
    list:[],
    currentchat: ''

  };
}

  handleClick = () => {
    this.setState({openCreateChannel:true})
  } 
  createChannels = (newChannel) => {
    // console.log(newChannel);
    // let x = this.state.list;
    // x.push(newChannel);
    // this.setState({list:x});
    // console.log(newChannel+ "list data");
    // console.log(this.state.list);
    this.setState({openCreateChannel:false})

    let UID='';
        let ChannelID = '';
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("userName: ", user.displayName);
                console.log("user email: ", user.email);
                console.log("user id: ",user.uid);
                UID = user.uid;
                let d = new Date();
                let n = d.getTime();
                ChannelID = `${UID}${n}`;
                console.log(ChannelID);

            } else {
                // No user is signed in.
                console.log("no user is signed in");
            }

            console.log('ddddasd '+UID);
        
        let sampleMembers = [
        ];

        let d = new Date();
        let n = d.getTime();
        let sampleMessages = [
        ]

        firebase.database().ref('channels/'+ChannelID.toString()).set({
            channelname: newChannel.val,
            description: '',
            ChannelID: ChannelID.toString(),
            members: sampleMembers,
            messages: sampleMessages
        });
        //console.log("from write user: ", name + " " + emailId + " " + id);

        });
  }


  componentDidMount(){
    
    let currentUID,currentUName;

  firebase.auth().onAuthStateChanged((user) => {
             if (user) {
               console.log("userName: ", user.displayName);
               console.log("user email: ", user.email);
               currentUID = user.uid;
               currentUName = user.displayName;
               this.setState({currentUserName: currentUName});
               this.setState({currentUserId: currentUID});
           } else {
               // No user is signed in.
               console.log("no user is signed in");
           }
         })


  let user = [];        
  const UserList = firebase.database().ref('users/').once('value').then((snapshot) => {
           console.log("Users: ", snapshot.val());
           let userArr = snapshot.val();
           let obj;
           console.log(userArr);
           for(obj in userArr){
             console.log(userArr[obj].username);
             let obj1 = {};
             obj1.id = obj;
             obj1.name = userArr[obj].username  
             user.push(obj1);
           }
           this.setState({users: user});
           console.log("console from component mount: ",this.state.users);
       });

  const channelList = firebase.database().ref('channels/').on('value', (snapshot) => {
          let channel = [];  
           console.log("Channels: ", snapshot.val());
           let channelArr = snapshot.val();
           let obj;
           console.log(channelArr);
           for(obj in channelArr){
             console.log(channelArr[obj].channelname);
             channel.push(channelArr[obj].channelname);
           }
           this.setState({channels: channel});
           console.log("console from component mount: ",channel);
       });
  }


  signOut = () => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("user is signed out");
            history.push('./');

        }).catch(function(error) {
            // An error happened.
            console.log(error);
        });
    }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    this.setState({ open: false });
  };
  addUsers = () => {
     let adding = this.state.members.slice();
     adding.push({id:this.state.nextId , person:this.state.searchTerm});
     this.setState({
       members : adding,
       nextId : ++this.state.nextId
     });
   };
  handleEvent = (term) => {
     this.state.searchTerm = term;
     this.setState({searchTerm: term});
     console.log("inside  "+this.state.searchTerm);
     this.addUsers();
   }

   unset = () => {
      this.setState({openCreateChannel: false});
   }

   async hello(id){

     let currentUID,currentUName;

     this.setState({openCreateChannel: false});

  await firebase.auth().onAuthStateChanged((user) => {
             if (user) {
               console.log("userName: ", user.displayName);
               console.log("user email: ", user.email);
               currentUID = user.uid;
               currentUName = user.displayName;
           } else {
               // No user is signed in.
               console.log("no user is signed in");
           }
         })

   let user;
         let userList = this.state.users;
         console.log("userList length from on click: ",userList.length);
         for(user in userList){
           console.log(user.id);
           if(userList[user].id == id){
             console.log("userName onClick: ",userList[user].name);
             this.setState({chatUserName: userList[user].name});
             break;
           }
         }

    console.log(id);
    this.setState({chatToId: id});
    this.setState({currentmsgs: []});

    id = id.toString();
    console.log(id);
    console.log(currentUName);        
  const msgList = firebase.database().ref('users/'+currentUID+'/message_list/'+id).on('value' , (snapshot) => {
           console.log("Channels: ", snapshot.val());
           let msgs = [];
           let msgArr = snapshot.val();
           let obj;
           console.log(msgArr);
           for(obj in msgArr){
             console.log(msgArr[obj].content);
             if(msgArr[obj].type === 'sent'){
              msgs.push({time: msgArr[obj].time,content: msgArr[obj].content, name: this.state.currentUserName});
            }
             else{
                msgs.push({time: msgArr[obj].time, content: msgArr[obj].content, name: this.state.chatUserName});
             }
           }
           this.setState({currentmsgs: msgs});
           console.log("console from component mount: ",msgs);
       });

       } 

   handleChatChange = (e) => {
    this.setState({currentchat: e.target.value});

   }

   handleChatSubmit(){

      console.log('handle submit');
      let d = new Date();
      let n = d.getTime().toString();
      console.log(d.toString().substr(4,20));
      let msg = {
        content: this.state.currentchat,
        time : d.toString().substr(4,17),
        type: 'sent'
      }
      this.setState({currentchat: ''});
      console.log(msg.content);

     var updates = {};
     var newPostKey = firebase.database().ref().child('/users/'+this.state.currentUserId + '/message_list/' + this.state.chatToId).push().key;
     updates['/users/'+this.state.currentUserId + '/message_list/' + this.state.chatToId + '/'+ newPostKey] = msg;

     firebase.database().ref().update(updates); 


     let msg2 = {
        content: this.state.currentchat,
        time : d.toString().substr(4,17),
        type: 'recieved'
     }

     var updates2 = {};
     var newPostKey2 = firebase.database().ref().child('/users/'+this.state.chatToId + '/message_list/' + this.state.currentUserID).push().key;
     updates['/users/'+this.state.chatToId + '/message_list/' + this.state.currentUserId + '/'+ newPostKey] = msg2;
     firebase.database().ref().update(updates);
   }

  render() {

    
    let hello = this.state.users.map((user) =>{
      return (
        <ListItem button id={user.id}>
          <ListItemText onClick={()=>this.hello(user.id)} primary={user.name} />
        </ListItem>
   )
    })

    let Channel = this.state.channels.map( (item) => {
          return (
                <ListItem button>
                    <ListItemText primary={item}
                      style={{float:"left", color: '#ffffff', fontSize: '18px', marginLeft: '10px' }} />
                      
                </ListItem> )
            })

      let msgs = '';
      if(this.state.currentmsgs){      
      msgs = this.state.currentmsgs.map( (item) => {
        return(
        <List>
          <ListItem >
                <ListItemText primary={item.content} secondary = {item.name}
                style={{float:"left", color: '#ffffff', fontSize: '18px', marginLeft: '10px' }} />
                <ListItemSecondaryAction> {item.time} </ListItemSecondaryAction>    
          </ListItem>
          <Divider/>
          </List>
        )
      })
    }

    //console.log(hello);
    const { alignItems, direction, justify } = this.state;
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <List>
        <Grid container>
          <Grid xs={12}>
            <ListItem>
              <ListItemText primary={firebase.auth().currentUser.displayName} />
            </ListItem>
          </Grid>   
        </Grid>
        <Divider />
        </List>
        <div className={classes.toolbar} />
        <ListItem button>
         <FullScreenDialog />
       </ListItem>
        <ListItem>
          <h3>Channels</h3>
          <Icon button className={classes.iconHover} onClick={this.handleClick}>
           add_circle
          </Icon>
        </ListItem>
          { Channel }
          <h3 >&nbsp;&nbsp;Users </h3>
          {hello} 
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Grid container
             alignItems={alignItems}
             direction={direction}
             justify={justify}
            >
             <Grid xs={10}>
               <Typography variant="title" color="inherit" noWrap>
                  {this.state.chatUserName}
               </Typography>
             </Grid>
             <Grid xs={1}>
               <TemporaryDrawer members={this.state.members}/>
             </Grid>
             <Grid xs={1}>
                <Settings signOut={this.signOut} meth={this.handleEvent}/>
             </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.state.openCreateChannel && <CreateChannel fun={this.unset} channels={this.createChannels} />}
         {!this.state.openCreateChannel && msgs}

          <InputLabel htmlFor="adornment-amount"></InputLabel>

         <Input value={this.state.currentchat} onChange={this.handleChatChange.bind(this)}
           className = {classes.adornmentamount}
           placeholder="enter the message"
           startAdornment={<InputAdornment position="start"></InputAdornment>}

         />
             <button onClick={this.handleChatSubmit.bind(this)} class="material-icons">send</button>
        
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);