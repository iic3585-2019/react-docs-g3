import React, { Component } from 'react';
import PropTypes from 'prop-types';
import likesService from '../services/likes';
import LikesFormComponent from '../components/LikesForm';

export default class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      liked: false,
      likedId: undefined,
      likesCount: 0,
    };
    this.onSubmitLike = this.onSubmitLike.bind(this);
  }

  componentWillMount() {
    if (this.props.entity.likes) {
      for (let i = 0; i < this.props.entity.likes.length; i += 1) {
        if (this.props.entity.likes[i].userId === parseInt(this.props.currentUserId, 10)) {
          this.setState({
            liked: true,
            likedId: this.props.entity.likes[i].id,
            likesCount: this.props.entity.likes.length,
          });
          break;
        }
      }
    }
  }

  async onSubmitLike(likeType, likeData) {
    try {
      if (likeData.liked) {
        await likesService.destroyLike(
          this.props.likeType,
          this.props.entity.id,
          this.state.likedId,
          likeData,
        );

        this.setState({
          liked: false,
          likesCount: this.state.likesCount - 1,
        });
      } else {
        const like = await likesService.putLike(this.props.likeType, this.props.entity, likeData);
        this.setState({
          liked: true,
          likesCount: this.state.likesCount + 1,
          likedId: like.id,
        });
      }
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  render() {
    return (
      <div className="like-wrapper">
        <LikesFormComponent
          {...this.props}
          onSubmitLike={this.onSubmitLike}
          liked={this.state.liked}
        />
        <span
          className="like-count"
        >{this.state.likesCount} {
          this.state.likesCount === 0 || this.state.likesCount !== 1 ? 'likes' : 'like'
        }
        </span>
      </div>);
  }
}

Like.defaultProps = {
  currentUserId: undefined,
};

Like.propTypes = {
  entity: PropTypes.object.isRequired,
  currentUserId: PropTypes.string,
  likeType: PropTypes.string.isRequired,
};
