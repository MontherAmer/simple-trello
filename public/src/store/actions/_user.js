import { userApis } from '../apis/apis';
import { userActionTypes } from '../constants';

export const login = (data) => (dispatch) => {
  return userApis.logIn(data).then((res) => {
    return res.success
      ? (localStorage.setItem('KANBAN_USER_TOKEN', res.data.token),
        dispatch({
          type: userActionTypes.USER_LOGED_IN,
          payload: res.data,
        }))
      : res.data;
  });
};

export const signUp = (data) => (dispatch) => {
  return userApis.signUp(data).then((res) => {
    return res.success
      ? (localStorage.setItem('KANBAN_USER_TOKEN', res.data.token),
        dispatch({
          type: userActionTypes.USER_LOGED_IN,
          payload: res.data,
        }))
      : res.data;
  });
};

export const logOut = () => (dispatch) => {
  localStorage.removeItem('KANBAN_USER_TOKEN');
  return dispatch({ type: userActionTypes.USER_LOGED_OUT });
};

export const getUserData = (id) => (dispatch) => {
  return userApis.getData(id).then((res) => {
    return res.success
      ? (localStorage.setItem('KANBAN_USER_TOKEN', res.data.token),
        dispatch({
          type: userActionTypes.USER_LOGED_IN,
          payload: res.data,
        }))
      : res.data;
  });
};
