import * as types from './actiontypes';
import MadlenURL from '../components/MadlenURL'
/*
Action Creators , 행동을 정의!
*/
export function changeAppRoot(root) { //isLogin
  return {
    type: types.ROOT_CHANGED, 
    root: root
  };
}
export function changeUser(user) {
  return {type : types.LOGIN, user:user};
}
export function getHistory(){
  return function(dispatch, getState) {
    return getState().history.history_list;
    }
  }
export function refreshHistory(user) { //Refresh History(Drawer History List)
  return async function action(dispatch) {
    let url = MadlenURL.HISTORY_LIST
    let headers = new Headers({'authorization': user.usr_auth});
    const request =  fetch(url, {
        method: 'get',
        headers
    })
     await request.then((response) => response.json())
    .then((responseData) => {
      return dispatch({ type : types.REFRESH_HISTORY,history_list:responseData.histories})
    })
  }
}
export function appInitialized() {
  return async function(dispatch, getState) {
    dispatch(changeAppRoot('login'));
  };
}
export function login(user) {
  return async function(dispatch, getState) {
    dispatch(changeAppRoot('after-login'));
    dispatch(changeUser(user));
  };
}
export function updateProfile(user) {
  return async function(dispatch, getState) {
    dispatch(changeUser(user));
  };
}
export function getUserData(){
 return function(dispatch, getState) {
    return getState().root.user;
  };
}