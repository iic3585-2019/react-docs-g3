/*  eslint class-methods-use-this: ["error", { "exceptMethods": ["onSubmit"] }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../actions/authActions';

@connect(store => ({
  user: store.auth.user,
}))
export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.dispatch(signOut());
  }

  render() {
    return (
      <nav className="sidebar-container">
        <ul className="sidebar-ul">
          <li>
            <Link to="/">
              <span role="img" aria-label="sushi">🍣</span>
            </Link>
          </li>
          {this.props.user &&
            <li>
              <span>Hi <Link
                to={`/users/${this.props.user.currentUser}`}
                className="user-link"
                >{this.props.user.currentUser}</Link> :-)</span>
              <div>
                <form onSubmit={this.onSubmit} className="dropdown-item" action="/signin" method="post">
                  <input type="hidden" name="_method" value="delete" />
                  <input type="submit" value="Log Out" />
                </form>
              </div>
            </li>
          }
          {!this.props.user &&
            <li>
              <Link to="/signin">Sign in</Link>
            </li>
          }
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
        </ul>
      </nav>
    );
  }
}

Sidebar.defaultProps = {
  user: undefined,
  dispatch: undefined,
};

Sidebar.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.shape({
    currentUser: PropTypes.string.isRequired,
  }),
};
