import {connect} from 'react-redux';
import {SortBy} from '../actions';
import RedPosts from '../components/RedPosts';

const getPosts = ({posts, filter, sortBy}) => {
  return posts
    .filter(post => post.title.toLowerCase().match(filter.toLowerCase()))
    .sort(SortBy[sortBy]);
}

const mapStateToProps = state => ({
  posts: getPosts(state)
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(RedPosts);
