import { cardApis } from '../apis/apis';
import { boardsActionTypes, utilsActionType } from '../constants';

/* ---------------------------CREATE CARD ACTION----------------------------- */
/* -------------------------------------------------------------------------- */
export const createCard = (data) => (dispatch) => {
  dispatch({ type: boardsActionTypes.ADD_CARD, payload: data });
  return cardApis.create(data).then((res) => {
    if (res.success) {
      dispatch({ type: boardsActionTypes.UPDATE_ONE_BOARD, payload: res.data });
    }
  });
};

/* ---------------------------UPDATE CARD ACTION----------------------------- */
/* -------------------------------------------------------------------------- */

export const updateCard = (data) => (dispatch) => {
  const formData = new FormData();
  if (data.name === 'checkList') {
    formData.append(data.name, JSON.stringify(data.value));
  } else if (data.name === 'images') {
    formData.append(data.name, data.value);
  } else {
    formData.append(data.name, data.value);
  }
  return cardApis.update({ boardId: data.boardId, cardId: data.cardId, data: formData }).then((res) => {
    dispatch({ type: utilsActionType.MODAL_DATA_UPDATED, payload: res.cardData });
    if (res.success) dispatch({ type: boardsActionTypes.UPDATE_ONE_BOARD, payload: res.data });
  });
};

export const updateCardLocation = (data) => (dispatch) => {
  dispatch({ type: boardsActionTypes.UPDATE_CARD_LOCATION, payload: data });
  return cardApis.updateLocation(data).then((res) => {
    if (res.success) dispatch({ type: boardsActionTypes.UPDATE_ONE_BOARD, payload: res.data });
  });
};

/* ---------------------------DELETE CARD ACTION----------------------------- */
/* -------------------------------------------------------------------------- */

export const deleteCard = (data) => (dispatch) => {
  dispatch({ type: boardsActionTypes.DELETE_CARD, payload: data });
  return cardApis.delete(data).then((res) => {
    if (res.success) dispatch({ type: boardsActionTypes.UPDATE_ONE_BOARD, payload: res.data });
  });
};

/* -----------------------CREATE CARD COMMENT ACTION------------------------- */
/* -------------------------------------------------------------------------- */
export const createComment = (data) => (dispatch) => {
  return cardApis.createComment(data).then((res) => {
    if (res.success) dispatch({ type: boardsActionTypes.UPDATE_ONE_BOARD, payload: res.data });
  });
};

/* -----------------------DELETE CARD COMMENT ACTION------------------------- */
/* -------------------------------------------------------------------------- */
export const removeComment = (data) => (dispatch) => {
  return cardApis.removeComment(data).then((res) => {
    if (res.success) dispatch({ type: boardsActionTypes.UPDATE_ONE_BOARD, payload: res.data });
  });
};
