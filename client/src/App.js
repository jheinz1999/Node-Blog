import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import LoginView from './views/LoginView';

class App extends Component {

  render() {

    const { history, location } = this.props;

    if (!localStorage.user && location.pathname !== '/login') {

      history.push('/login');

    }

    else if (localStorage.user && location.pathname === '/') {

      history.push('/blog');

    }

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
          render={() => <LoginView />}
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

export default withRouter(App);
