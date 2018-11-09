let nextId = 0;

export const addPost = post => ({
  type: 'ADD_POST',
  id: nextId++,
  post
});

export const setSortBy = sortBy => ({
  type: 'SORT_BY',
  sortBy
});

export const setFilter = filter => ({
  type: 'FILTER',
  filter
});

export const SortMethods = {
  DATE: 'DATE',
  TITLE: 'TITLE',
  VOTES: 'VOTES',
};

export const SortBy = {
  DATE: (a,b) => new Date(b.date) - new Date(a.date),
  TITLE: (a,b) => a.title.localeCompare(b.title),
  VOTES: (a,b) => b.votes - a.votes,
};
