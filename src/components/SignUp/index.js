import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

class SignUpFormBase extends Component {
  state = { ...INITIAL_STATE }

  onSubmit = (event) => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        this.setState({ error })
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  };

  render() {

    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid = 
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      passwordTwo === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={this.onChange}
          placeholder="Full Name"
        />
        <input
          type="text"
          name="email"
          value={email}
          onChange={this.onChange}
          placeholder="email"
        />
        <input
          type="password"
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">Sign Up</button>
        { error && <p>{error.message}</p>}
      </form>
    )
  }
};

const SignUpLink = () => (
  <p>
    Don't have an account yet? <Link to={ROUTES.SIGN_UP}></Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase,)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };