import React from 'react';
import RedNav from './RedNav';
import RedHeader from './RedHeader';
import RedPostList from '../containers/RedPostList';

const App = () => (
    <div>
        <RedNav />
        <div className="container">
            <RedHeader />
            <RedPostList />
        </div>
    </div>
);

export default App;

// export default class RedditClone extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     posts: this.props.store.getState(),
    //     //     sortBy: 'votes',
    //     //     filter: ''
    //     // };

    //     this.store = this.props.store;
    //     // this.createNewPost = this.createNewPost.bind(this);  
    //     this.vote = this.vote.bind(this);
    //     this.addComment = this.addComment.bind(this);    
    // }

    // vote(ud, key) {
    //     this.props.store.dispatch({type: 'BUTTS'});
    // }

    // vote(ud, key) {
    //     this.setState({posts: this.state.posts.map(post => {
    //         if (post.key === key) {
    //             if (ud === 'up') {
    //                 post.votes++;
    //             }
    //             else {
    //                 post.votes = Math.max(0, post.votes-1);
    //             }
    //         }
    //         return post;
    //     })});
    // }

    // addComment(comment, key) {
    //     this.setState({posts: this.state.posts.map(post => {
    //         if (post.key === key) {
    //             post.comments.push(comment);
    //         }
    //         return post;
    //     })});
    // }

//     render() {
//         return (
//         <div>
//             <RedditNav />
//             <div className="container">
//                 <RedditHeader store={this.store}
//                     filter={this.store.getState().filter}
//                     setFilter={filter => this.store.dispatch({type: '', filter})}
//                     setSort={sortBy => this.store.dispatch({type: '', sortBy})}
//                     createNewPost={this.createNewPost}
//                 />
//                 <RedditPosts 
//                     store={this.store}
//                     posts={this.store.getState().posts.filter(e => e.title.().match(this.store.getState().filter.()))} 
//                     sortBy={this.store.getState().sortBy} 
//                     vote={this.vote}
//                     addComment={this.addComment} 
//                 />
//                 </div>
//         </div>
//         );
//     }
// }
