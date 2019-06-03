import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrgPostComponent from '../components/OrgPost';
import UserPostComponent from '../components/UserPost';
import feedService from '../services/feed';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: undefined,
      posts: [],
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  async fetchPosts() {
    this.setState({ loading: true });
    const feedData = await feedService.get({ ...this.props });
    this.setState({ posts: feedData, loading: false });

    console.log(feedData);
  }

  render() {
    if (this.state.loading) {
      return (<p>Loading...</p>);
    }

    return (
      <div>
        {this.state.error && <div className="error">Error: {this.state.error}</div>}
        {this.state.posts && this.state.posts.map(post => (
          <UserPostComponent
            currentUserId={this.props.currentUserId}
            key={post.id}
            entity={post}
          />
        ))}
      </div>
    );
  }
}

Feed.propTypes = {
  feedType: PropTypes.string.isRequired,
  currentUserId: PropTypes.string,
};

Feed.defaultProps = {
  currentUserId: undefined,
};
