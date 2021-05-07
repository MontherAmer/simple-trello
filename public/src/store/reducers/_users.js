import { userActionTypes, boardsActionTypes } from '../constants';

const initialState = {
  _id: '',
  email: '',
  name: '',
  kanban: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case userActionTypes.USER_LOGED_IN:
      localStorage.setItem('KANBAN_USER_TOKEN', payload.token);
      return { ...state, ...payload };
    case boardsActionTypes.UPDATE_ALL_BOARDS:
      return { ...state, boards: payload, kanban: payload._id };
    case userActionTypes.USER_LOGED_OUT:
      return {};
    default:
      return state;
  }
};
