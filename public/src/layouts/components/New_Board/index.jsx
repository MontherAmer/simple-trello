import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { hideModal, createBoard } from '../../../store/actions';

const colorArray = ['#1979BE', '#D29034', '#519839', '#B04632', '#89609E', '#CD5A91', '#5AC06B', '#42AECC', '#838C91'];

export default () => {
  const [state, setState] = useState({});
  const dispatch = useDispatch();
  const handleTitle = (e) => setState({ ...state, title: e.target.value });

  const handleCreate = () => {
    dispatch(createBoard(state?.title?.length ? state : { background: state.background, title: 'New Board' }));
    dispatch(hideModal());
  };

  return (
    <div className="new-board">
      <input
        type="text"
        className="new-board__input"
        placeholder="Enter board name"
        value={state.title || ''}
        onChange={handleTitle}
      />
      <div className="d-flex flex-column align-item-center ">
        <div className="d-flex  w-100 align-item-center justify-content-between">
          {colorArray.map((item, i) => (
            <div
              className={`color-item ${state?.background === item ? 'selected' : ''}`}
              style={{ backgroundColor: `${item}` }}
              onClick={() => setState({ ...state, background: item })}
              key={i}
            ></div>
          ))}
        </div>
        <div className="d-flex  w-100 align-item-center">
          <button className="btn btn-success btn-sm w-100 my-2" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
