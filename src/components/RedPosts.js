import React from 'react';
import PropTypes from 'prop-types';
import RedPost from './RedPost';

const RedPosts = ({ posts }) => (
  <div>
  {posts.map(post => <div><RedPost post={post} key={post.key} /></div>)}
  </div>
)

// RedPosts.propTypes = {

// };

export default RedPosts;

// export default class RedPosts extends React.Component {
//   render() {
//     const posts = this.props.store.getState().posts
//         .sort(sortBy[this.props.store.getState().sortBy])
//         .map(post => <RedditPost post={post} key={post.key} 
//                       vote={this.props.vote} addComment={this.props.addComment} />)
//     return ( <div>{posts}</div> );
//   }
// }
