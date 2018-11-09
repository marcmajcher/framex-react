import React from 'react';
import RedNewPost from './RedNewPost';
import style from '../style.css';
import { connect } from 'react-redux'
import { setFilter, setSortBy, SortMethods } from '../actions';


class RedHeader extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showNewPostForm: false
        };
        this.toggleNewPostForm = this.toggleNewPostForm.bind(this);
    }
    
    toggleNewPostForm() {
        this.setState({showNewPostForm: !this.state.showNewPostForm});
    }
    createNewPost() {}
    render() {
        const dispatch = this.props.dispatch;
        const postForm = this.state.showNewPostForm ? 
            <RedNewPost createNewPost={this.createNewPost} /> : '';

        return (
        <header>
            <input className={style.filter} name="filter" type="text" placeholder="Filter" 
                onChange={e => dispatch(setFilter(e.target.value))}/>
            Sort by: {' '}
            <select name="sort" id="sort" 
                onChange={e => dispatch(setSortBy(e.target.value))}>
                <option value={SortMethods.VOTES}>Votes</option>
                <option value={SortMethods.DATE}>Date</option>
                <option value={SortMethods.TITLE}>Title</option>
            </select>
            <button className="u-pull-right button-primary" 
                onClick={this.toggleNewPostForm}>New Post</button>
            { postForm }
        </header>
        );
    }
}

export default connect()(RedHeader);

// export default class RedditHeader extends React.Component {
//   constructor(props) {
//       super(props);
//       this.state = {
//           showNewPostForm: false,
//       };

//       this.createNewPost = this.createNewPost.bind(this);
//   }


//   createNewPost(data) {
//       this.setState({showNewPostForm: false});
//       this.props.createNewPost(data);
//   }

 