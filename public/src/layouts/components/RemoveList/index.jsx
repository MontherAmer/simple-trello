import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteList, hideModal } from '../../../store/actions';

import removeIcon from '../../../assets/remove.svg';
import closeIcon from '../../../assets/close.svg';

export default () => {
  const dispatch = useDispatch();
  const { modalData } = useSelector((state) => state.utilsState);
  const { boardId, listId } = modalData;

  const remove = () => (dispatch(deleteList({ boardId, listId })), dispatch(hideModal()));

  const close = () => dispatch(hideModal());

  return (
    <div className="remove-list-modal">
      <h3 className="pb-3">Are you sure?</h3>
      <div className="d-flex justify-content-between">
        <button className="remove-modal-button" onClick={remove}>
          <img src={removeIcon} />
          Yes
        </button>
        <button className="remove-modal-button" onClick={close}>
          <img src={closeIcon} />
          Close
        </button>
      </div>
    </div>
  );
};
