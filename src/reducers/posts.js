let postKey = 0;

const posts = (state = [], action) => {
  switch (action.type) {
    case 'ADD_POST':
      const newPost = Object.assign({}, action.post, {
        votes: 0,
        date: new Date(),
        key: postKey++,
        comments: []
      })
      return state.concat(newPost);
    case 'VOTE_UP':
      return state.map(post => {
        if (post.key === action.key) {
          post = Object.assign({}, post, {votes: post.votes+1});
        }
        return post;
      });
    case 'VOTE_DOWN':
      return state.map(post => {
        if (post.key === action.key) {
          post = Object.assign({}, post, {votes: Math.max(0, post.votes-1)});
        }
        return post;
      });
    case 'ADD_COMMENT':
      return state.map(post => {
        if (post.key === action.key) {
          post.comments.push(action.comment);
        }
        return post;
      })
    default:
      return state;
  }
};

export default posts;
