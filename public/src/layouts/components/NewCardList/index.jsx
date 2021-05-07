import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { createList, createCard } from '../../../store/actions';
import { ShowCreateContext } from '../../../context/ShowCreateContext';

import { FaPlus } from 'react-icons/fa';

export default ({ id, boardId, type }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  const { showId } = useContext(ShowCreateContext);

  const handleChange = (e) => setState({ ...state, title: e.target.value });

  const handleClick = () => (
    setState({ ...state, title: '' }),
    type === 'list'
      ? dispatch(createList({ title: state.title ? state.title : 'unnamed list', boardId }))
      : dispatch(createCard({ title: state.title ? state.title : 'unnamed card', boardId, listId: id }))
  );

  return (
    <div id={id} className={`new-card-list${showId === id ? ' new-card-list__active' : ''}`}>
      {showId !== id ? (
        <div className={`new-${type}-placeholder`} id={id}>
          <FaPlus id={id} />
          <p id={id}>Add another {type}</p>
        </div>
      ) : null}
      <input
        id={id}
        type="text"
        placeholder={`Enter ${type} title`}
        autoComplete="off"
        value={state.title || ''}
        onChange={handleChange}
        className={`list-name-input ${showId === id ? 'list-name-input__active' : ''}`}
      />
      <button
        className={`btn btn-success btn-sm btn-block my-2 new-card-list-button ${showId === id ? 'new-card-list-button__active' : ''}`}
        onClick={handleClick}
      >
        Add {type}
      </button>
    </div>
  );
};
