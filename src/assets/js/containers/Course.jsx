import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Links from '../containers/Links';
import Files from '../containers/Files';
import CourseCard from '../components/CourseCard';
import { subscribeToTimer } from '../services/api';
import { fetchCourse, removeActualCourse } from '../actions/courseActions';

@connect(store => ({
  teachers: store.course.courseTeachers,
  courseFiles: store.course.courseFiles,
  fetchingCourseFiles: store.course.fetchingCourseFiles,
  fetchingCourse: store.course.fetchingCourse,
  course: store.course.course,
  links: store.course.links,
}))
class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 'no timestamp yet',
    };

    this.onClickLink = this.onClickLink.bind(this);

    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp,
      }));
  }

  componentDidMount() {
    this.props.dispatch(fetchCourse(this.props.match.params.courseNumber));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.courseNumber !== this.props.match.params.courseNumber) {
      nextProps.dispatch(fetchCourse(nextProps.match.params.courseNumber));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(removeActualCourse());
  }

  onClickLink() {
    const form = this.links.form.input;
    form.focus();
  }

  render() {
    if (this.props.fetchingCourse) {
      return <p>Loading...</p>;
    }

    return (
      <div id="container">
        <div id="header">
          <div id="course-info">
            {this.props.course && (
              <CourseCard
                onClick={this.onClickDropzone}
                course={this.props.course}
                onClickLink={this.onClickLink}
              />
            )}
            {this.props.courseFiles && <Files {...this.props} />}
            {<Links {...this.props} />}
          </div>
        </div>
      </div>
    );
  }
}

Course.defaultProps = {
  currentUser: undefined,
  dispatch: undefined,
  fetchingCourse: undefined,
  match: {
    params: {
      courseNumber: '',
    },
  },
  course: undefined,
  courseFiles: [],
};

Course.propTypes = {
  currentUser: PropTypes.string,
  courseFiles: PropTypes.arrayOf(PropTypes.shape({
    courseNumber: PropTypes.string.isRequired,
    extension: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
  })),
  course: PropTypes.shape({
    courseNumber: PropTypes.string.isRequired,
    description: PropTypes.string,
    englishName: PropTypes.string,
    name: PropTypes.string.isRequired,
    ua: PropTypes.string.isRequired,
  }),
  dispatch: PropTypes.func,
  fetchingCourse: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      courseNumber: PropTypes.string,
    }),
  }),
};

export default withRouter(Course);
