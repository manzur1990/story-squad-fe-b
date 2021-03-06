import { global, faceoffs } from '../actions';

const initialState = null;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case faceoffs.SET_SQUAD_FACEOFFS:
      return [...action.payload];
    case global.CLEAR_USERS:
      return initialState;
    default:
      return state;
  }
};
