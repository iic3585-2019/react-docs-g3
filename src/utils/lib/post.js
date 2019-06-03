/* eslint no-await-in-loop: "off" */

const randomPuppy = require('random-puppy');
const moment = require('moment');

exports.parsePosts = async function parsePosts(seq, posts) {
  const finalPosts = [];
  for (let i = 0; i < posts.length; i += 1) {
    // Extracting important values from Sequlize returned object.
    const post = posts[i].dataValues;
    // Obtaining other relevant objects related to the post.
    const dog = await seq.models.dogs.findById(post.dogId);
    const comments = await seq.models.comments.findAll({ where: { postId: post.id } });
    const photo = await seq.models.photos.findOne({ where: { dogId: dog.id } });

    // Adding relevant information
    post.dogNickname = `${dog.nickname} 🐶`;
    post.dogId = dog.id;

    // Presence of orgId defines if the post belongs to the org or to the user.
    // Either userId or orgId should always be present.
    if (post.orgId) {
      const temp = await seq.models.orgs.findById(post.orgId);
      post.postedBy = temp.name;
      post.postedById = temp.id;
    } else {
      const temp = await seq.models.users.findById(post.userId);
      post.postedBy = temp.username;
      post.postedById = temp.id;
    }
    post.date = moment(post.updatedAt).format('MMM Do');
    post.commentsCount = comments.length;
    // randomPuppy for testing, on final deploy should remove randomPuppy() option.
    if (photo) {
      post.imgUrl = photo.url;
    } else {
      post.imgUrl = await randomPuppy();
    }
    finalPosts.push(post);
  }
  return finalPosts;
};

exports.obtainFollowPosts = async function obtainFollowPosts(seq, uid, amount = 5) {
  const following = await seq.models.follows.findAll({ where: { userId: uid } });
  let posts = [];
  let followedPosts;
  let follow;
  for (let i = 0; i < following.length; i += 1) {
    follow = following[i].dataValues;
    // Where i go looking for post depends on the followType and ID of the followed entity
    switch (follow.followType) {
      case 'dog':
        followedPosts = await seq.models.posts.findAll({
          where: { dogId: follow.followedId },
          limit: amount,
          order: [['updatedAt', 'DESC']],
          include: [
            { model: seq.models.users, as: 'user', required: false },
            { model: seq.models.orgs, as: 'org', required: false },
            { model: seq.models.dogs, as: 'dog' },
            { model: seq.models.comments, as: 'comments' },
            { model: seq.models.photos, as: 'photos' },
          ],
        });
        break;
      case 'user':
        followedPosts = await seq.models.posts.findAll({
          where: { userId: follow.followedId },
          limit: amount,
          order: [['updatedAt', 'DESC']],
          include: [
            { model: seq.models.users, as: 'user', required: false },
            { model: seq.models.orgs, as: 'org', required: false },
            { model: seq.models.dogs, as: 'dog' },
            { model: seq.models.comments, as: 'comments' },
            { model: seq.models.photos, as: 'photos' },
          ],
        });
        break;
      case 'org':
        followedPosts = await seq.models.posts.findAll({
          where: { orgId: follow.followedId },
          limit: amount,
          order: [['updatedAt', 'DESC']],
          include: [
            { model: seq.models.users, as: 'user', required: false },
            { model: seq.models.orgs, as: 'org', required: false },
            { model: seq.models.dogs, as: 'dog' },
            { model: seq.models.comments, as: 'comments' },
            { model: seq.models.photos, as: 'photos' },
          ],
        });
        break;
      default:
        followedPosts = [];
    }
    for (let j = 0; j < followedPosts.length; j += 1) {
      posts.push(followedPosts[j]);
    }
    // if we obtain more than amount posts we take the first amount
    if (posts.length >= amount) {
      posts = posts.slice(0, amount);
      break;
    }
  }
  return posts;
};

exports.parseComments = async function parseComments(sequelize, comments, user) {
  const finalComments = [];
  let comment;
  for (let i = 0; i < comments.length; i += 1) {
    comment = comments[i].dataValues;
    comment.date = moment(comment.updatedAt).format('LLL');
    // if update and creation apart by more than 5 minutes (1000 * 60 * 5 ms)
    if (comment.updatedAt - comment.createdAt > 1000 * 60 * 5) {
      comment.edited = true;
    }
    if (comment.userId) {
      const commentUser = await sequelize.models.users.findById(comment.userId);
      comment.postedBy = commentUser.username;
      comment.link = `/user/${commentUser.id}`;
      if (user) {
        if (user.id === commentUser.id) {
          comment.canEdit = true;
        }
      }
    } else if (comment.orgId) {
      const org = await sequelize.models.orgs.findById(comment.orgId);
      comment.postedBy = org.name;
      comment.link = `/org/${org.id}`;
      if (user) {
        if (user.orgId === org.id) {
          comment.canEdit = true;
        }
      }
    } else {
      comment.postedBy = 'Anonymus';
    }

    finalComments.push(comment);
  }
  return finalComments;
};
