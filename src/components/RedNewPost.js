import React from 'react';
import { connect } from 'react-redux'
import { addPost, toggleNewPostForm } from '../actions';
import style from '../style.css';

class RedNewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitDisabled: true,
            post: {
                title: '',
                author: '',
                body: '',
                image: 'https://www.fillmurray.com/300/200'
            }
        };

        this.createNewPost = this.createNewPost.bind(this);
        this.updateField = this.updateField.bind(this);
    }
    
    createNewPost(e) {
        e.preventDefault();
        this.props.dispatch(addPost(this.state.post));
        this.props.dispatch(toggleNewPostForm());
    }

    updateField(e) {
        const post = Object.assign({}, this.state.post);
        post[e.target.name] = e.target.value;

        let submitDisabled = false;
        ['title', 'author', 'body', 'image'].forEach(e => {
            if (post[e] === '') {
                submitDisabled = true;
            }
        })

        this.setState({submitDisabled, post});
    }

    render() {
        const post = this.state.post;
        const isDisabled = this.state.submitDisabled;
        const submitClass = (isDisabled ? 'button-disabled' : 'button-primary');
        const invalid = style.invalid;

        return ( 
            <form onSubmit={this.createNewPost}>
                <hr />
                <label htmlFor="title">Title</label>
                <input className={`u-full-width${post.title?'':` ${invalid}`}`} type="text" 
                    name="title" value={post.title} onChange={this.updateField} />

                <label htmlFor="body">Body</label>
                <textarea className={`u-full-width${post.body?'':` ${invalid}`}`}
                     name="body" value={post.body} onChange={this.updateField} />

                <label htmlFor="author">Author</label>
                <input className={`u-full-width${post.author?'':` ${invalid}`}`} type="text" 
                    name="author" value={post.author} onChange={this.updateField} />

                <label htmlFor="image">Image</label>
                <input className={`u-full-width${post.image?'':` ${invalid}`}`} type="text" 
                    name="image" value={post.image} onChange={this.updateField} />
                <label>
                    <input className={submitClass} type="submit" disabled={isDisabled} value="Create Post" />
                </label>
                <hr />
            </form>
        );
    }
}

export default connect()(RedNewPost);
