import * as types from '../actions/actiontypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  history_list : []
});

//history reducer
export function history(state = initialState, action = {}) {]
  switch (action.type) {    
    case types.REFRESH_HISTORY:
      return state.merge({history_list:action.history_list})
    default:
      return state;
  }
}