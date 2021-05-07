import React from 'react';
import { useDispatch } from 'react-redux';

import { updateBoard, showLoader, hideLoader } from '../../../store/actions';
import { FaRegStar, FaStar } from 'react-icons/fa';
export default ({ board, handleRedirect }) => {
  const dispatch = useDispatch();
  let { _id, title, starred, background } = board;

  const handleStar = async (e) => {
    // * dont trigger the parent div on click
    e.stopPropagation();
    dispatch(showLoader());
    await dispatch(updateBoard({ _id, starred: true }));
    dispatch(hideLoader());
  };

  return (
    <div
      className="thumbnail"
      id="out"
      style={{ backgroundColor: `${background}` }}
      onClick={() => handleRedirect(_id)}
    >
      <div className="thumbnail-title">
        <h3>{title}</h3>
      </div>
      <div className="thumbnail-footer" id="star" onClick={handleStar}>
        {starred ? <FaStar /> : <FaRegStar />}
      </div>
    </div>
  );
};
