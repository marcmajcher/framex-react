let postKey = 0;

const posts = (state = [], action) => {
  switch(action.type) {
    case 'ADD_POST':
      const newPost = Object.assign({}, action.post, {
        votes: 0,
        date: new Date(),
        key: postKey++,
        comments: []
      })
      return state.concat(newPost);
    default:
      return state;
  }
};

export default posts;
