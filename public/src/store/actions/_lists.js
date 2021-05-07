import { listApis } from '../apis/apis';
import { boardsActionTypes, utilsActionType } from '../constants';

export const createList = (data) => (dispatch) => {
  dispatch({ type: utilsActionType.SHOW_LOADER });
  return listApis.create(data).then((res) => {
    dispatch({ type: utilsActionType.HIDE_LOADER });
    if (res.success) {
      dispatch({ type: boardsActionTypes.UPDATE_ONE_BOARD, payload: res.data });
    }
  });
};

export const updateList = (data) => (dispatch) => {
  return listApis.update(data).then((res) => {
    if (res.success) {
      dispatch({ type: boardsActionTypes.UPDATE_ONE_BOARD, payload: res.data });
    }
  });
};

export const updateListOrder = (data) => (dispatch) => {
  let source = data.source.sourceIndex;
  let destination = data.destination.destinationIndex;
  dispatch({ type: boardsActionTypes.UPDATE_LIST_LOCATION, payload: { source, destination } });
  return listApis.updateOrder(data).then((res) => {
    if (res.success) {
      dispatch({ type: boardsActionTypes.UPDATE_ONE_BOARD, payload: res.data });
    }
  });
};

export const deleteList = (data) => (dispatch) => {
  dispatch({ type: boardsActionTypes.DELETE_LIST, payload: data.listId });
  return listApis.delete(data).then((res) => {
    if (res.success) {
      dispatch({ type: boardsActionTypes.UPDATE_ONE_BOARD, payload: res.data });
    }
  });
};
