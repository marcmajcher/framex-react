import {connect} from 'react-redux';
import {SortBy} from '../actions';
import RedPosts from '../components/RedPosts';

const getPosts = ({posts, filter, sortBy}) => posts
    .filter(post => post.title.toLowerCase().match(filter.toLowerCase()))
    .sort(SortBy[sortBy]);

const mapStateToProps = state => ({
  posts: getPosts(state)
})

export default connect(mapStateToProps)(RedPosts);
