import React from 'react';
import { connect } from 'react-redux'
import { voteUp, voteDown } from '../actions';
import RedPostComments from './RedPostComments';
import style from '../style.css';

class RedPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showComments: false };
        this.toggleComments = this.toggleComments.bind(this);
    }

    toggleComments() {
        this.setState({ showComments: !this.state.showComments });
    }

    render() {
        const post = this.props.post;
        const dispatch = this.props.dispatch;
        const s = (post.comments.length === 1) ? '' : 's';
        return (
            <section className={style.post}>
                <img src={post.image} alt={post.title} />
                <div className={style.title}>{post.title}</div>
                <div className={style.votes}>
                    <i className="fas fa-arrow-up" onClick={e => dispatch(voteUp(post.key))}></i>
                    <i className="fas fa-arrow-down" onClick={e => dispatch(voteDown(post.key))}></i>
                    {' '}{post.votes}
                </div>
                <div className={style.author}>{post.author}</div>
                <div className={style.body}>{post.body}</div>
        
                <div className="comments">{moment(post.date).fromNow()} | {' '}
                    <span onClick={this.toggleComments}>
                        <i className="fas fa-comment-alt"></i> {post.comments.length} Comment{s}
                    </span>
                    {this.state.showComments ? 
                        <RedPostComments post={post} /> : ''}
                </div>
            </section>
        );
    }
}

export default connect()(RedPost);
