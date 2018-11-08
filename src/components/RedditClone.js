import React from 'react';
import RedditNav from './RedditNav';
import RedditHeader from './RedditHeader';
import RedditPosts from './RedditPosts';

export default class RedditClone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: this.props.posts,
            sortBy: 'votes',
            filter: ''
        };

        this.createNewPost = this.createNewPost.bind(this);  
        this.vote = this.vote.bind(this);
        this.addComment = this.addComment.bind(this);    
    }

    createNewPost(data) {
        data.votes = 0;
        data.date = new Date();
        data.key = this.state.posts.length + 1;
        data.comments = [];
        this.setState({posts: this.state.posts.concat(data)});
    }

    getPostByKey(posts, key) {
        for (let i=0; i<posts.length; i++) {
            if (posts[i].key === key) {
                return posts[i];
            }
        }
    }

    vote(ud, key) {
        const posts = this.state.posts.slice();
        const post = this.getPostByKey(posts, key);

        if (post) {
            if (ud === 'up') {
                post.votes++;
            }
            else {
                post.votes = Math.max(0, post.votes-1);
            }
            this.setState(posts);
        }
    }

    addComment(comment, key) {
        const posts = this.state.posts.slice();
        const post = this.getPostByKey(posts, key);

        if (post) {
            post.comments.push(comment);
            this.setState(posts);
        }
    }

    render() {
        return (
        <div>
            <RedditNav />
            <div className="container">
                <RedditHeader 
                    filter={this.state.filter}
                    setFilter={filter => this.setState({filter})}
                    setSort={sortBy => this.setState({sortBy})}
                    createNewPost={this.createNewPost}
                />
                <RedditPosts 
                    posts={this.state.posts.filter(e => e.title.toLowerCase().match(this.state.filter.toLowerCase()))} 
                    sortBy={this.state.sortBy} 
                    vote={this.vote}
                    addComment={this.addComment} 
                />
                </div>
        </div>
        );
    }
}
