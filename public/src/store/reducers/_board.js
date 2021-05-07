import { boardsActionTypes } from '../constants';
import { updateCardLocHelper } from '../../utils';
const initialState = {};

export default (state = initialState, { type, payload }) => {
  let lists;
  let index;
  let list;
  switch (type) {
    case boardsActionTypes.UPDATE_ONE_BOARD:
      return { ...state, ...payload };
    case boardsActionTypes.UPDATE_LIST_LOCATION:
      lists = state.lists;
      [lists[payload.source], lists[payload.destination]] = [lists[payload.destination], lists[payload.source]];
      return { ...state, lists };
    case boardsActionTypes.DELETE_LIST:
      lists = state.lists.filter((item) => item._id !== payload);
      return { ...state, lists };
    case boardsActionTypes.ADD_CARD:
      state.lists.map((list, i) => {
        if (String(list._id) === String(payload.listId)) index = i;
      });
      lists = state.lists;
      lists[index].cards.push({ title: payload.title });
      return { ...state, lists };
    case boardsActionTypes.DELETE_CARD:
      let { cardId, listId } = payload;
      state.lists.map((item) => (item._id === listId ? (list = item) : null));
      list.cards = list.cards.filter((item) => item._id !== cardId);
      lists = state.lists.map((item) => (item._id === listId ? list : item));
      return { ...state, lists };
    case boardsActionTypes.UPDATE_CARD_LOCATION:
      return { ...state, lists: updateCardLocHelper({ lists: state.lists, data: payload }) };
    default:
      return state;
  }
};
