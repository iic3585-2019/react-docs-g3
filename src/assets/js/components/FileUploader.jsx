/*  eslint no-param-reassign: ["error", { "props": false }] */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropzoneComponent from 'react-dropzone-component';
import PropTypes from 'prop-types';
import { subscribeToFileProgress } from '../services/api';
import FilesContainer from '../containers/FilesContainer';

const extensions = require('../../../config/extensions');
const request = require('superagent');

@connect(store => ({
  course: store.course.course,
  user: store.auth.user,
}))
export default class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queuedFiles: {},
      uploadingFiles: {},
    };

    this.initDropzone = this.initDropzone.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.onClickRemoveFile = this.onClickRemoveFile.bind(this);
    this.keepOnPage = this.keepOnPage.bind(this);

    subscribeToFileProgress((err, data) => {
      const { file, prog } = data;
      const { percentage, transferred } = prog;
      console.log(percentage, transferred);
      const uploadingFiles = Object.assign({}, this.state.uploadingFiles);
      if (percentage !== 100) {
        const uploadingFile = uploadingFiles[file.name];
        uploadingFile.progress = percentage;
      } else {
        delete uploadingFiles[file.name];
      }
      this.setState({ uploadingFiles });
    });

    this.dropzone = null;
    this.componentConfig = {
      postUrl: '/posts',
      dropzoneSelector: 'main',
      createImageThumbnails: false,
    };

    this.djsConfig = {
      autoProcessQueue: false,
      acceptedFiles: extensions,
      maxFilesize: 20,
      maxFiles: 15,
      params: {
        courseNumber: this.props.courseNumber,
      },
      previewsContainer: false,
    };

    this.eventHandlers = {
      init: this.initDropzone,
      maxfilesexceeded: (file) => {
        console.log('maxfilesexceeded');
        this.dropzone.removeFile(file);
      },
      removedfile: (file) => {
        //  kinda O(1)
        //  https://stackoverflow.com/questions/7700987/performance-of-key-lookup-in-javascript-object
        if (file.name in this.state.queuedFiles) {
          delete this.state.queuedFiles[file.name];
          console.log(`${file.name} deleted`);
          console.log(this.files);
        }
      },
      addedfile: (addedFile) => {
        setTimeout(() => {
          if (addedFile.accepted) {
            const file = {
              file: addedFile,
              courseNumber:this.props.course.courseNumber,
              progress: 0,
            };
            const queuedFiles = Object.assign({}, this.state.queuedFiles);
            queuedFiles[addedFile.name] = file;
            this.setState({ queuedFiles });
            console.log(this.state.queuedFiles);
          } else {
            this.dropzone.removeFile(addedFile);
          }
        }, 1);
      },
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.keepOnPage);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.keepOnPage);
  }

  onClickRemoveFile(e, file) {
    const queuedFiles = Object.assign({}, this.state.queuedFiles);
    delete queuedFiles[file];
    this.setState({ queuedFiles });
  }

  keepOnPage(ev) {
    if (Object.keys(this.state.queuedFiles).length > 0
      || Object.keys(this.state.uploadingFile).length > 0) {
      ev.preventDefault();
      ev.returnValue = 'Are you sure you want to leave?';
    }
  }

  initDropzone(dz) {
    this.dropzone = dz;

    //  hack
    this.setState(this.state);
  }

  handlePost() {
    if (Object.keys(this.state.queuedFiles).length > 0) {
      Object.keys(this.state.queuedFiles).forEach((key) => {
        const addedFile = this.state.queuedFiles[key];
        const req = request.post('/posts');
        req.attach(addedFile.file.name, addedFile.file);
        req.field('courseNumber', addedFile.courseNumber);
        req.field('user', this.props.user.currentUser);
        req.end((res) => {
          console.log(JSON.stringify(res));
        });
      });
      const queuedFiles = Object.assign({}, this.state.queuedFiles);
      this.setState({ uploadingFiles: queuedFiles, queuedFiles: {} });
    } else {
      console.log('no files to upload');
    }
  }

  render() {
    return (
      <div>
        <DropzoneComponent
          config={this.componentConfig}
          djsConfig={this.djsConfig}
          eventHandlers={this.eventHandlers}
        >{this.props.children}
          {(Object.keys(this.state.queuedFiles).length > 0
            || Object.keys(this.state.uploadingFiles).length > 0) &&
            <FilesContainer
              onClick={this.handlePost}
              queuedFiles={this.state.queuedFiles}
              uploadingFiles={this.state.uploadingFiles}
              onClickRemoveFile={this.onClickRemoveFile}
            />
          }
        </DropzoneComponent>
      </div>
    );
  }
}

FileUploader.defaultProps = {
  clickable: [],
  courseNumber: null,
  user: undefined,
};

FileUploader.propTypes = {
  user: PropTypes.shape({
    currentUser: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  courseNumber: PropTypes.string,
  clickable: PropTypes.arrayOf(PropTypes.string),
};
