import { boardApis } from '../apis/apis';
import { boardsActionTypes, utilsActionType } from '../constants';

export const createBoard = (data) => (dispatch) => {
  dispatch({ type: utilsActionType.SHOW_LOADER });
  return boardApis.create(data).then((res) => {
    dispatch({ type: utilsActionType.HIDE_LOADER });
    if (res.success) {
      return dispatch({
        type: boardsActionTypes.UPDATE_ALL_BOARDS,
        payload: res.data,
      });
    }
  });
};

export const getOneBoard = (data) => (dispatch) => {
  return boardApis.getOne(data).then((res) => {
    return res.success ? dispatch({ type: boardsActionTypes.UPDATE_ONE_BOARD, payload: res.data }) : false;
  });
};

export const updateBoard = (data) => (dispatch) => {
  dispatch({ type: utilsActionType.SHOW_LOADER });
  return boardApis.update(data).then((res) => {
    dispatch({ type: utilsActionType.HIDE_LOADER });
    if (res.success)
      dispatch({
        type: boardsActionTypes.UPDATE_ONE_BOARD,
        payload: res.data,
      });
    if (res.allBoardsData) dispatch({ type: boardsActionTypes.UPDATE_ALL_BOARDS, payload: res.allBoardsData });
  });
};

export const addMember = (data) => (dispatch) => {
  return boardApis.addMember(data).then((res) => {
    console.log(res);
  });
};
