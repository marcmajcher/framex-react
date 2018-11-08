import React from 'react';
import RedditPost from './RedditPost';

const sortBy = {
  votes: (a,b) => b.votes - a.votes,
  date: (a,b) => new Date(b.date) - new Date(a.date),
  title: (a,b) => a.title.localeCompare(b.title)
};

export default class RedditPosts extends React.Component {
  render() {
    const posts = this.props.posts
        .sort(sortBy[this.props.sortBy])
        .map(post => <RedditPost post={post} key={post.key} 
                      vote={this.props.vote} addComment={this.props.addComment} />)
    return ( <div>{posts}</div> );
  }
}
