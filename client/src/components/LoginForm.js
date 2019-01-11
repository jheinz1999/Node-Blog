import React from 'react';
import { connect } from 'react-redux';

import { login } from '../redux/actions/users';

class LoginForm extends React.Component {

  constructor() {

    super();

    this.state = {

      username: '',
      password: '',
      errorMsg: 'Username does not exist!',
      showError: false

    }

  }

  componentDidUpdate(prevProps) {

    if (prevProps.loginStatus !== this.props.loginStatus) {

      if (props.loginStatus === 'SUCCESS')
        history.push('/blog');

      else
        this.setState({showError: true});

    }

  }

  handleChange = e => {

    this.setState({
      [e.target.name]: e.target.value,
      showError: false
    });

  }

  handleSubmit = e => {

    e.preventDefault();

    this.props.login(username, password);

  }

  render() {

    const { username, password } = this.state;

    return (

      <form onSubmit={this.handleSubmit} className='login-form'>

        <input type='text' name='username' value={username} placeholder='username' onChange={this.handleChange} />
        <input type='password' name='password' value={password} placeholder='password' onChange={this.handleChange} />

        {this.state.showError && <p>{this.state.errorMsg}</p>}

      </form>

    );

  }

}

function stateToProps(state) {

  return {

    loginStatus: state.loginStatus

  }

}

export default connect(stateToProps, { login })(LoginForm);
