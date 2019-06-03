import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LinkForm extends Component {
  constructor(props) {
    super(props);
    this.state = { url: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ url: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmitLink(this.state);
  }

  render() {
    return (
      <form>
        <div className="form-group comment-form">
          <input
            ref={(input) => { this.input = input; }}

            type="text"
            className="form-control no-border comment-text-input"
            id="commentText"
            placeholder="Paste url..."
            onChange={this.onInputChange}
          />
          <button
            onClick={this.onSubmit}
            className="btn btn-primary btn-submit-comment"
          >Post link
          </button>
        </div>
      </form>
    );
  }
}

LinkForm.propTypes = {
  onSubmitLink: PropTypes.func.isRequired,
};
