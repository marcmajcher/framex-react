let nextId = 0;

export const toggleNewPostForm = () => ({
  type: 'TOGGLE_NEW_POST_FORM'
})

export const addPost = post => ({
  type: 'ADD_POST',
  id: nextId++,
  post
})

export const voteUp = key => ({
  type: 'VOTE_UP', 
  key
})

export const voteDown = key => ({
  type: 'VOTE_DOWN', 
  key
})

export const addComment = (comment, key) => ({
  type: 'ADD_COMMENT', 
  comment,
  key
})

export const setFilter = filter => ({
  type: 'SET_FILTER',
  filter
})

export const setSortBy = sortBy => ({
  type: 'SET_SORT',
  sortBy
})

export const SortMethods = {
  DATE: 'DATE',
  TITLE: 'TITLE',
  VOTES: 'VOTES',
}

export const SortBy = {
  DATE: (a,b) => new Date(b.date) - new Date(a.date),
  TITLE: (a,b) => a.title.localeCompare(b.title),
  VOTES: (a,b) => b.votes - a.votes,
}
