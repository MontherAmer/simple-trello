import React from 'react';
import { useDispatch } from 'react-redux';

import { hideModal } from '../../../store/actions';

import Board from '../New_Board';
import RemoveList from '../RemoveList';
import UpdateCard from '../UpdateCard';

const Components = {
  Board: Board,
  RemoveList: RemoveList,
  UpdateCard: UpdateCard,
};

export default ({ type }) => {
  const dispatch = useDispatch();
  const handleClick = (e) => (e.target.id === 'out' ? dispatch(hideModal()) : null);

  return (
    <div className="modal" id="out" onClick={handleClick}>
      <div id="in" onClick={handleClick}>
        {React.createElement(Components[type])}
      </div>
    </div>
  );
};
