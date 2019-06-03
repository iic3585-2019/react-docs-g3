import React, { Component } from 'react';
import PropTypes from 'prop-types';

const moment = require('moment');

export default class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRemoveButton: false,
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.removeFile = this.removeFile.bind(this);
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

  removeFile() {
    this.props.removeFile(this.props.file);
  }

  render() {
    return (
      <div
        className="file-content"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div>
          <a
            target="_blank"
            href={this.props.file.path}
            className="url-link"
          >{this.props.file.filename}
          </a>
          <p style={{ marginTop: 0 }}>
            <a
              href={`/users/${this.props.file.username}`}
              className="url-link"
            >@{this.props.file.username}
            </a> | {moment(this.props.file.updatedAt).format('lll')} | {this.props.file.size}
          </p>
        </div>
        <div>
          {this.props.user
            && this.props.user.currentUser === this.props.file.username
            && this.state.showRemoveButton
            && <button onClick={this.removeFile}>Remove</button>
          }
        </div>
      </div>
    );
  }
}

File.defaultProps = {
  user: undefined,
};

File.propTypes = {
  user: PropTypes.shape({
    currentUser: PropTypes.string.isRequired,
  }),
  removeFile: PropTypes.func.isRequired,
  file: PropTypes.shape({
    path: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
  }).isRequired,
};
