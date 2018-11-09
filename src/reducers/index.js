import { combineReducers } from 'redux';
import posts from './posts';
import sortBy from './sortBy';
import filter from './filter';

export default combineReducers({
  posts,
  sortBy,
  filter
});
