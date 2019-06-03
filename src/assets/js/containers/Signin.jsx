import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SigninForm from '../components/SigninForm';
import { signIn } from '../actions/authActions';

@connect(store => ({
  user: store.auth.user,
}))
export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(data) {
    console.log(this.props);
    this.props.dispatch(signIn(data, this.props.history));
  }

  render() {
    if (this.state.loading) {
      return (<p>Loading...</p>);
    }

    return (
      <div className="flex-grid-fourths">
        <div className="col" />
        <div className="col2">
          <h1>Sign in</h1>
          <SigninForm {...this.props} onSubmit={this.onSubmit} />
        </div>
        <div className="col" />
      </div>
    );
  }
}

Signin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
