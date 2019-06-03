import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../actions/userActions';

@connect(store => ({
  user: store.user.user,
  loadingUser: store.user.loadingUser,
}))
export default class User extends Component {
  componentWillMount() {
    this.props.dispatch(getUser(this.props.match.params.userId));
  }

  render() {
    if (this.props.loadingUser || !this.props.user) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <p>{this.props.user.username} :-)</p>
        <video title="Taken from Facebook :-)" height="240" autoPlay loop>
          <track kind="captions" />
          <source src="https://storage.googleapis.com/dogfinder/23684770_376355832809351_3692374764371836928_n.mp4" type="video/mp4" />
        Your browser does not support the video tag.
        </video>
      </div>
    );
  }
}

User.defaultProps = {
  loadingUser: true,
  dispatch: undefined,
  user: undefined,
  match: {
    params: {
      userId: '',
    },
  },
};

User.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  loadingUser: PropTypes.bool,
  dispatch: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    }),
  }),
};
