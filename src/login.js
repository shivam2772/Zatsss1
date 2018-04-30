import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import './login.css';
import MediaQuery from 'react-responsive';
import sapient from './logo1.png';
import * as firebase from 'firebase';
import history from './history'
import './login.css';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
export default class Login extends React.Component{
  constructor() {
        super();
        this.state = {
            User: [],
            Message: [],
            Channel: []
        };
        this.writeUser = this.writeUser.bind(this);
        this.signinWithGoogle = this.signinWithGoogle.bind(this);
    }

    writeUser(name, emailId, imageUrl, id) {
        firebase.database().ref('users/' + id).set({
            username: name,
            email: emailId,
            profileImage: imageUrl
        });
        console.log("from write user: ", name + " " + emailId + " " + id);
    }
    
    signinWithGoogle() {
        console.log('HI');
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('Profile');
        provider.addScope('email');
        firebase.auth().signInWithRedirect(provider);
        // firebase.auth().getRedirectResult().then(function(result) {
        //     if (result.credential) {
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         let token = result.credential.accessToken;
        //         // ...
        //     }

        //     let user = result.user;
        //     console.log("user from google: ", user);
        //     console.log("userName: ", user.displayName);
        //     console.log("user email: ", user.email);
        //     console.log("user uid: ", user.uid);
        //     this.writeUser(user.displayName, user.email, "", user.uid);

        // }).catch(function(error) {
        //     // Handle Errors here.
        //     console.log("error");
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // The email of the user's account used.
        //     var email = error.email;
        //     var credential = error.credential;
        //     // ...
        // });


    }
    componentDidMount() {

    

        var user = firebase.auth().currentUser;
        console.log("user Info: ", user);
        let name, email, photoUrl, uid, emailVerified;

        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // ...
            }

            const user = result.user;
            name = user.displayName;
            email = user.email;
            uid = user.uid;
            //console.log("user from google: ",user);
            console.log("userName: ", name);
            console.log("user email: ", email);
            //this.writeUser(name,email, "",uid);
            firebase.database().ref('users/' + uid).set({
                username: name,
                email: email,
                profileImage: null,
                uid: uid,
                message_list: '',
            });
        }).catch(function(error) {
            // Handle Errors here.
            console.log("error: ", error.message);
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            var credential = error.credential;
            // ...
        });
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log("userName: ", user.displayName);
                console.log("user email: ", user.email);
                history.push('./Router');

            } else {
                // No user is signed in.
                console.log("no user is signed in");
                history.push('./');

            }
        });
    }


	render(){
		return (
		<fragment>
		<header className="App-header centered">
          <img src={sapient} className="App-logo" alt="logo" />
          <MediaQuery query="(min-device-width: 1224px)">
          <h1 className="App-title">Welcome to ZATSSS</h1>
          </MediaQuery>
          <MediaQuery query="(max-device-width: 1224px)">
      <h1 className="App-title">Welcome to ZATSSS</h1>
    </MediaQuery>
        </header>
		  <div className="loginfields centered" >
    	 <Button variant="raised" color="primary" onClick = {this.signinWithGoogle} >
          Login with Google
        </Button>
      </div>
    </fragment>
		);
	}
}