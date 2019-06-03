import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import UploadFile from '../components/UploadFile';

export default class Course extends PureComponent {
  render() {
    return (
      <div id="df-container">
        <div id="df-header">
          <span>{`Uploading ${Object.keys(this.props.uploadingFiles).length} files`}</span>
          <button onClick={this.props.onClick}>Upload</button>
        </div>
        <div id="df-content">
          {Object.keys(this.props.queuedFiles).length > 0 &&
            Object.keys(this.props.queuedFiles).map(key => (
              <UploadFile
                key={key}
                file={this.props.queuedFiles[key]}
                courseNumber={this.props.queuedFiles[key].courseNumber}
                onClick={this.props.onClickRemoveFile}
                />
            ))
          }
          {Object.keys(this.props.uploadingFiles).length > 0 &&
            Object.keys(this.props.uploadingFiles).map(key => (
              <UploadFile
                key={key}
                file={this.props.uploadingFiles[key]}
                courseNumber={this.props.uploadingFiles[key].courseNumber}
                uploading
                />
            ))
          }
        </div>
      </div>
    );
  }
}
