import React from 'react';
import PropTypes from 'prop-types';

const bytes = require('bytes');

export default function UploadFile(props) {
  return (
    <div className="dz-preview dz-file-preview">
      <div className="dz-details">
        <div className="dz-filename">
          <span data-dz-name="true">{props.file.file.name}</span>{' | '}
          <span data-dz-size>{bytes(props.file.file.size)}</span>{' → '}
          <span data-course-number>{props.file.courseNumber}</span>{' '}
          {!props.uploading &&
            <button onClick={e => props.onClick(e, props.file.file.name)}>Remove</button>
          }
        </div>
      </div>
      <div className="dz-progress">
        <span className="dz-upload" style={{ minWidth: '5%', width: `${props.file.progress}%` }} />
        <span className="dz-upload-progress">{Math.round(props.file.progress)}%</span>
      </div>
      <div className="dz-error-message"><span data-dz-errormessage="true" /></div>
    </div>
  );
}

UploadFile.defaultProps = {
  onClick: undefined,
  uploading: false,
};

UploadFile.propTypes = {
  file: PropTypes.shape({
    file: PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
    }).isRequired,
    courseNumber: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  uploading: PropTypes.bool,
};
