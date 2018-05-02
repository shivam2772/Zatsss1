import React, { Component } from 'react';
import ResponsiveDrawer from './ResponsiveDrawer';
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import Login from './login';
import './App.css';
class App extends Component {
  
  render() {
    return (
      <div>
        <Router>
          <fragment>
            <Route exact={true} exact path="/"  component={Login} />
            <Route path="/Router" component={ResponsiveDrawer} />
          </fragment>
        </Router>
      </div>
    );
  }
}

export default App;
