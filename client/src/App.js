import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Route
          exact
          path='/'
          render={() => <h1>Slash</h1>}
        />

        <Route
          exact
          path='/login'
          render={() => <h1>Log In</h1>}
        />

        <Route
          exact
          path='/blog'
          render={() => <h1>Blog</h1>}
        />

      </div>
    );
  }
}

export default App;
