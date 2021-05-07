import { utilsActionType } from '../constants';

const initialState = {
  showLoader: false,
  showModal: false,
  modalType: '',
  modalData: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case utilsActionType.SHOW_LOADER:
      return { ...state, showLoader: true };
    case utilsActionType.HIDE_LOADER:
      return { ...state, showLoader: false };
    case utilsActionType.SHOW_MODAL:
      return { ...state, showModal: true, modalData: payload.data, modalType: payload.type };
    case utilsActionType.HIDE_MODAL:
      return { ...state, showModal: false, modalData: {}, modalType: '' };
    case utilsActionType.MODAL_DATA_UPDATED:
      return { ...state, modalData: payload };
    default:
      return state;
  }
};
