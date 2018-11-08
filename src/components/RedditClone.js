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

    vote(ud, key) {
        this.setState({posts: this.state.posts.map(post => {
            if (post.key === key) {
                if (ud === 'up') {
                    post.votes++;
                }
                else {
                    post.votes = Math.max(0, post.votes-1);
                }
            }
            return post;
        })});
    }

    addComment(comment, key) {
        this.setState({posts: this.state.posts.map(post => {
            if (post.key === key) {
                post.comments.push(comment);
            }
            return post;
        })});
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
