import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCI1co6DKDmFkm-b3lJUmfHfNJmZJ1IWkY",
    authDomain: "slack-demo-2ad89.firebaseapp.com",
    databaseURL: "https://slack-demo-2ad89.firebaseio.com",
    projectId: "slack-demo-2ad89",
    storageBucket: "slack-demo-2ad89.appspot.com",
    messagingSenderId: "947277133194"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
