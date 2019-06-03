import React, { Component } from 'react';

import PropTypes from 'prop-types';

const moment = require('moment');

export default class Link extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRemoveButton: false,
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.removeLink = this.removeLink.bind(this);
  }

  onMouseLeave() {
    if (this.state.showRemoveButton) {
      this.setState({ showRemoveButton: !this.state.showRemoveButton });
    }
  }

  onMouseEnter() {
    if (!this.state.showRemoveButton) {
      this.setState({ showRemoveButton: !this.state.showRemoveButton });
    }
  }

  removeLink() {
    this.props.removeLink(this.props.link);
  }

  render() {
    const userText = `Posted by @${this.props.link.username}`;
    const timestampText = `on ${moment(this.props.link.updatedAt).format('lll')}`;
    return (
      <div
        className="table-content"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div className="link-bubble">
          <a
            title={`${userText} ${timestampText}`}
            target="_blank"
            href={this.props.link.url}
            className="url-link"
          >[{this.props.index}] {this.props.link.url}
          </a>
        </div>
        {this.props.user
          && this.props.user.currentUser === this.props.link.username
          && this.state.showRemoveButton
          && <div><button onClick={this.removeLink}>Remove</button></div>
        }
      </div>
    );
  }
}

Link.defaultProps = {
  user: undefined,
};

Link.propTypes = {
  user: PropTypes.shape({
    currentUser: PropTypes.string.isRequired,
  }),
  removeLink: PropTypes.func.isRequired,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
