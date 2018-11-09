import { SortMethods } from '../actions';

const sortBy = (state = SortMethods.VOTES, action) => {
  switch (action.type) {
    case 'SET_SORT':
      return action.sortBy;
    default:
      return state;
  }
}

export default sortBy;
