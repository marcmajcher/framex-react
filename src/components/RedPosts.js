import React from 'react';
import RedPost from './RedPost';
// import PropTypes from 'prop-types';

const RedPosts = ({ posts }) => (
  <div>
  {posts.map(post => <RedPost post={post} key={post.key} />)}
  </div>
)

export default RedPosts;
