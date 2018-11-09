import React from 'react';
import { connect } from 'react-redux'
import { addComment } from '../actions';
import style from '../style.css';

class RedPostComments extends React.Component {
  constructor(props) {
      super(props);

      this.state = {newComment: ''}
      this.addNewComment = this.addNewComment.bind(this);
  }

  addNewComment() {
      this.props.dispatch(addComment(this.state.newComment, this.props.post.key));
      this.setState({newComment:''});
  }

  render() {
      const comments = this.props.post.comments
          .map((e,i) => <div className={style.comment} key={i}>{e}</div>);
      return ( <div className={style.comments}>
          {comments}
          <input onChange={e => this.setState({newComment: e.target.value})} value={this.state.newComment} />
          {' '}<button onClick={this.addNewComment}>Add Comment</button>
          </div>);
  }
}

export default connect()(RedPostComments);
