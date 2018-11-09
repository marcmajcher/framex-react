const showNewPostForm = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_NEW_POST_FORM': 
      return !state; 
    default:
      return state;
  }
}

export default showNewPostForm;
