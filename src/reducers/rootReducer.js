import * as types from '../actions/actiontypes';
import Immutable from 'seamless-immutable';
const initialState = Immutable({
  root: undefined,
  user : {},
});
//root reducer
export function root(state = initialState, action = {}) {
  switch (action.type) {    
    case types.ROOT_CHANGED:
      return state.merge({
        root: action.root
      });
    case types.LOGIN:
      return state.merge({
        user:action.user
      });
    default:
      return state;
  }
}