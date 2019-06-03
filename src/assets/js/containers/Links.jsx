import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinkComponent from '../components/Link';
import LinkForm from '../components/LinkForm';
import { fetchLinks, putLink } from '../actions/courseActions';
import { removeLink } from '../actions/linkActions';

@connect(store => ({
  links: store.course.links,
  course: store.course.course,
  fetchingCourseLinks: store.course.fetchingCourseLinks,
  user: store.auth.user,
}))
export default class Links extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmitLink = this.onSubmitLink.bind(this);
    this.onRemoveLink = this.onRemoveLink.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchLinks(this.props.match.params.courseNumber));
  }

  async onSubmitLink(linkData) {
    const { course, user } = this.props;
    this.props.dispatch(putLink({ course, user, linkData }));
  }

  async onRemoveLink(link) {
    const { course, user } = this.props;
    if (window.confirm('Are you sure you want to remove this link?')) {
      this.props.dispatch(removeLink({ link, course, user }));
    }
  }

  render() {
    if (this.props.fetchingCourseLinks) {
      return (<p>Loading...</p>);
    }

    return (
      <div id="links" className="links-wrapper">
        <p className="section-title">Links</p>
        {this.props.user &&
          <LinkForm
            onSubmitLink={this.onSubmitLink}
            ref={(form) => { this.form = form; }}
            {...this.props}
          />
        }
        {this.props.links.length > 0 &&
            this.props.links.map((link, index) => (
              <LinkComponent
                {...this.props}
                index={index}
                key={link.id}
                link={link}
                currentUser={this.props.currentUser}
                removeLink={this.onRemoveLink}
              />
          ))
        }
        {!this.props.links.length && <p>No links</p>}
      </div>
    );
  }
}

Links.defaultProps = {
  user: undefined,
  course: undefined,
  dispatch: undefined,
};

Links.propTypes = {
  dispatch: PropTypes.func,
  course: PropTypes.shape({
    courseNumber: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ua: PropTypes.string.isRequired,
    description: PropTypes.string,
    englishName: PropTypes.string,
  }),
  user: PropTypes.shape({
    currentUser: PropTypes.string.isRequired,
  }),
};
