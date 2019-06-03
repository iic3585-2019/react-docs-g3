import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileComponent from '../components/File';
import { subscribeToFileUploaded, unsubscribeToFileUploaded } from '../services/api';
import { fetchFiles } from '../actions/courseActions';
import { recieveFile } from '../actions/uploadActions';
import { removeFile } from '../actions/fileActions';

@connect(store => ({
  user: store.auth.user,
  files: store.course.courseFiles,
  course: store.course.course,
  fetchingCourseFiles: store.course.fetchingCourseFiles,
}))
export default class Files extends Component {
  constructor(props) {
    super(props);

    subscribeToFileUploaded((err, data) => {
      if (this.props.course.courseNumber === data.file.courseNumber) {
        console.log(err, data);
        props.dispatch(recieveFile(data.file));
      }
    });

    this.onRemoveFile = this.onRemoveFile.bind(this);
  }

  componentDidMount() {
    if (this.props.course) {
      this.props.dispatch(fetchFiles(this.props.course.courseNumber));
    }
  }

  componentWillUnmount() {
    unsubscribeToFileUploaded(() => {});
  }

  onRemoveFile(file) {
    if (window.confirm('Are you sure you want to remove this file?')) {
      const props = { file, user: this.props.user, course: this.props.course };
      this.props.dispatch(removeFile(props));
    }
  }

  render() {
    if (this.props.fetchingCourseFiles) {
      return (<p>Loading...</p>);
    }

    return (
      <div id="content">
        <p className="section-title">Files</p>
        {this.props.files.length > 0 &&
          this.props.files.map(file => (
            <div key={file.id}>
              <FileComponent
                file={file}
                removeFile={this.onRemoveFile}
                {...this.props}
              />
            </div>
          ))
        }
        {!this.props.files.length && <p>No files</p>}
      </div>
    );
  }
}

Files.defaultProps = {
  currentUser: undefined,
  course: undefined,
  user: undefined,
  dispatch: undefined,
  fetchingCourseFiles: undefined,
};

Files.propTypes = {
  user: PropTypes.shape({
    currentUser: PropTypes.string.isRequired,
  }),
  course: PropTypes.shape({
    courseNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ua: PropTypes.string.isRequired,
    description: PropTypes.string,
    englishName: PropTypes.string,
  }),
  currentUser: PropTypes.string,
  dispatch: PropTypes.func,
  fetchingCourseFiles: PropTypes.bool,
};
