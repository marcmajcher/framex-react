import React from 'react';
import RedNewPost from './RedNewPost';
import style from '../style.css';
import { connect } from 'react-redux'
import { setFilter, setSortBy, toggleNewPostForm, SortMethods } from '../actions';

const RedHeader = (props) => (
    <header>
        <input className={style.filter} name="filter" type="text" placeholder="Filter" 
            onChange={e => props.dispatch(setFilter(e.target.value))}/>
        Sort by: {' '}
        <select name="sort" id="sort" 
            onChange={e => props.dispatch(setSortBy(e.target.value))}>
            <option value={SortMethods.VOTES}>Votes</option>
            <option value={SortMethods.DATE}>Date</option>
            <option value={SortMethods.TITLE}>Title</option>
        </select>
        <button className="u-pull-right button-primary" 
            onClick={e => props.dispatch(toggleNewPostForm())}>New Post</button>
        { props.showNewPostForm ? <RedNewPost /> : '' }
    </header>
)

const mapStateToProps = state => ({
    showNewPostForm: state.showNewPostForm
  })
  
export default connect(mapStateToProps)(RedHeader);
