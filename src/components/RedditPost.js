import React from 'react';
import style from '../style.css';
import RedditPostComments from './RedditPostComments';

export default class RedditPost extends React.Component {
  constructor(props) {
      super(props);
      this.state = { showComments: false };
      this.upvote = this.upvote.bind(this);
      this.downvote = this.downvote.bind(this);
      this.toggleComments = this.toggleComments.bind(this);
  }

  upvote() {
      this.props.vote('up', this.props.post.key);
  }
  
  downvote() {
      this.props.vote('down', this.props.post.key);
  }

  toggleComments() {
      this.setState({ showComments: !this.state.showComments });
  }

  render() {
      const post = this.props.post;
      const s = (post.comments.length === 1) ? '' : 's';

      return ( 
      <section className={style.post}>
          <img src={post.image} alt={post.title} />
          <div className={style.title}>{post.title}</div>
          <div className={style.votes}>
              <i className="fas fa-arrow-up" onClick={this.upvote}></i> 
              <i className="fas fa-arrow-down" onClick={this.downvote}></i> 
              {' '}{post.votes}
          </div>
          <div className={style.author}>{post.author}</div>
          <div className={style.body}>{post.body}</div>

          <div className="comments">{moment(post.date).fromNow()} | {' '}
              <span onClick={this.toggleComments}>
                  <i className="fas fa-comment-alt"></i> {post.comments.length} Comment{s}
              </span>
              {this.state.showComments ? 
                  <RedditPostComments post={post} addComment={this.props.addComment} /> : ''}
          </div>
      </section> 
      );
  }
}
