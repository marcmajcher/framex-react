import React from 'react';
import RedditNewPost from './RedditNewPost';
import style from '../style.css';

export default class RedditHeader extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          showNewPostForm: false,
      };

      this.toggleNewPostForm = this.toggleNewPostForm.bind(this);
      this.createNewPost = this.createNewPost.bind(this);
  }

  toggleNewPostForm() {
      this.setState({showNewPostForm: !this.state.showNewPostForm});
  }

  createNewPost(data) {
      this.setState({showNewPostForm: false});
      this.props.createNewPost(data);
  }

  render() {
      const postForm = this.state.showNewPostForm ? 
          <RedditNewPost createNewPost={this.createNewPost} /> : ''

      return ( <header>
          <input className={style.filter} name="filter" type="text" placeholder="Filter" 
              onChange={e => this.props.setFilter(e.target.value)}/>
          Sort by: {' '}
          <select name="sort" id="sort" 
              onChange={e => this.props.setSort(e.target.value)}>
              <option value="votes">Votes</option>
              <option value="date">Date</option>
              <option value="title">Title</option>
          </select>
          <button className="u-pull-right button-primary" 
              onClick={this.toggleNewPostForm}>New Post</button>
          { postForm }
      </header>
      );
  }
}
