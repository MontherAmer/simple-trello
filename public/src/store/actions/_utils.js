import { utilsActionType } from '../constants';

export const showModal = (data) => (dispatch) => {
  return dispatch({
    type: utilsActionType.SHOW_MODAL,
    payload: data,
  });
};

export const hideModal = () => (dispatch) => {
  return dispatch({
    type: utilsActionType.HIDE_MODAL,
  });
};

export const showLoader = () => (dispatch) => {
  return dispatch({
    type: utilsActionType.SHOW_LOADER,
  });
};

export const hideLoader = () => (dispatch) => {
  return dispatch({
    type: utilsActionType.HIDE_LOADER,
  });
};
