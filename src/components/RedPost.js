import React from 'react';
import style from '../style.css';
import RedPostComments from './RedPostComments';

const RedPost = ({post}) => {
    const s = (post.comments.length === 1) ? '' : 's';

    return (
    <section className={style.post}>
        <img src={post.image} alt={post.title} />
        <div className={style.title}>{post.title}</div>
        <div className={style.votes}>
            {/* <i className="fas fa-arrow-up" onClick={this.upvote}></i>  */}
            {/* <i className="fas fa-arrow-down" onClick={this.downvote}></i>  */}
            {' '}{post.votes}
        </div>
        <div className={style.author}>{post.author}</div>
        <div className={style.body}>{post.body}</div>

        <div className="comments">{moment(post.date).fromNow()} | {' '}
        {post.comments.length} Comment{s}
            {/* <span onClick={this.toggleComments}>
                <i className="fas fa-comment-alt"></i> {post.comments.length} Comment{s}
            </span>
            {this.state.showComments ? 
                <RedPostComments post={post} addComment={this.props.addComment} /> : ''} */}
        </div>
    </section>);
}

export default RedPost;

//       this.state = { showComments: false };
//   toggleComments() {
//       this.setState({ showComments: !this.state.showComments });
//   }
