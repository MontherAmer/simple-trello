import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateBoard } from '../../../store/actions';

import { FaArrowRight, FaRegUser, FaColumns, FaAlignJustify, FaUserFriends, FaPlus } from 'react-icons/fa';
import Cyrcle from '../RoundedImage';

const colorArray = ['#1979BE', '#D29034', '#519839', '#B04632', '#89609E', '#CD5A91', '#5AC06B', '#42AECC', '#838C91'];

const BoardMenu = ({ board, show, hide }) => {
  const disaptch = useDispatch();
  const [state, setState] = useState({});
  const boardState = useSelector((state) => state.boardState);

  useEffect(() => {
    setState({ ...state, ...boardState });
  }, [boardState]);

  const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const updateBg = (e) => disaptch(updateBoard({ _id: boardState._id, background: e }));

  const update = (e) => disaptch(updateBoard({ _id: boardState._id, [e]: state[e] }));

  return (
    <div className={`board-menu slide-left-menu ${show ? '' : 'slide-right-menu'}`}>
      <div className="board-menu-hide">
        <h4>Menu</h4>
      </div>
      <FaArrowRight size={20} onClick={hide} className="menu-hide-arrow" />

      <hr className="board-menu-divider" />
      {/* title */}
      <div className="menu-title">
        <FaColumns size={20} />
        &nbsp;
        <input
          className="menu-input"
          type="text"
          name="title"
          value={state.title || ''}
          onChange={handleChange}
          onBlur={() => update('title')}
        />
      </div>
      {/* made by */}
      <div className="menu-title">
        <FaRegUser size={18} />
        <h4>Made by</h4>
      </div>
      <div className="d-flex">
        <Cyrcle data={state?.createdBy?.name} size="larg" />
        <div className="d-flex flex-column justify-content-around ml-2">
          <h4>{board?.createdBy?.name}</h4>
          <p>{board?.createdBy?.email}</p>
        </div>
      </div>

      {/* Background */}
      <div className="menu-title">
        <FaColumns size={18} />
        <h4>Background</h4>
      </div>
      <div className="d-flex flex-column align-item-center ">
        <div className="d-flex  w-100 align-item-center justify-content-between">
          {colorArray.map((item, i) => (
            <div
              className={`color-item ${state?.background === item ? 'selected_b' : ''}`}
              style={{ backgroundColor: `${item}` }}
              onClick={() => updateBg(item)}
              key={i}
            ></div>
          ))}
        </div>
      </div>

      {/* description */}
      <div className="menu-title">
        <FaAlignJustify size={18} />
        <h4>Description</h4>
      </div>
      <textarea
        maxLength={90}
        className="menu-description"
        name="description"
        value={state?.description || ''}
        placeholder="Add detailed description"
        onChange={handleChange}
        onBlur={() => update('description')}
      />

      {/* members */}
      <div className="menu-title position-relative">
        <FaUserFriends size={18} />
        <h4>Members</h4>
      </div>
      <div className="menu-members">
        {state?.members?.map((item, i) => (
          <div className="m-1" key={i}>
            <Cyrcle size="small" data={item.name} />
          </div>
        ))}
        <div className="dropdown">
          <div className="rounded-img small m-1 pointer" id="dropdownMenuButton" data-toggle="dropdown">
            <FaPlus />
          </div>
          <div className="dropdown-menu px-1 w-dropdown" aria-labelledby="dropdownMenuButton">
            <input className="auth-form__input" type="text" name="member" onChange={handleChange} />
            <button className="btn btn-success btn-sm btn-block" onClick={() => update('member')}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardMenu;
