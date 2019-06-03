import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SignsForm extends Component {
  constructor(props) {
    super(props);
    this.state = { password: '', email: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form action="/signin" method="post" onSubmit={this.onSubmit}>
        <input type="hidden" name="_method" value="put" />
        <div className="form-group">
          Email address<br />
          <input
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email or Username"
            onChange={this.onInputChange}
          />
          <br />
          Password<br />
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            onChange={this.onInputChange}
          />
          <br />
          <small
            id="emailHelp"
            className="form-text text-muted"
          >{"Docs doesn't store your password and it uses Login UC to authenticate you."}
          </small>
        </div>
        <button className="btn btn-primary" type="submit">Sign In</button>
      </form>
    );
  }
}

SignsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
