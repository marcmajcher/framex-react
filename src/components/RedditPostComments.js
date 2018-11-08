import React from 'react';
import style from '../style.css';

export default class RedditPostComments extends React.Component {
  constructor(props) {
      super(props);

      this.state = {newComment: ''}
      this.addNewComment = this.addNewComment.bind(this);
  }

  addNewComment() {
      this.props.addComment(this.state.newComment, this.props.post.key);
      this.setState({newComment:''});
  }

  render() {
      const comments = this.props.post.comments
          .map(e => <div className={style.comment} key={e}>{e}</div>);
      return ( <div className={style.comments}>
          {comments}
          <input onChange={e => this.setState({newComment: e.target.value})} value={this.state.newComment} />
          <button onClick={this.addNewComment}>Add Comment</button>
          </div>);
  }
}
