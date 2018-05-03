import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { ResponsiveDrawer } from './ResponsiveDrawer';
import Login from './login';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  render() {
    return (
      <div>
        <Router>
          <fragment>
            <Route exact path="/" component={Login} />
            <Route path="/Router" component={ResponsiveDrawer} />
          </fragment>
        </Router>
      </div>
    );
  }
}

export default App;
