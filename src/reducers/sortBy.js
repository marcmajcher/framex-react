import { SortMethods } from '../actions';

const sortBy = (state = SortMethods.VOTES, action) => {
  switch (action.type) {
    case 'SORT_BY':
      return action.sortBy;
    default:
      return state;
  }
}

export default sortBy;
