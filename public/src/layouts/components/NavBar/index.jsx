import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { showModal, logOut } from '../../../store/actions';
import { navBackgrounds } from '../../../utils';

import logo from '../../../assets/logo.svg';
import { FaRegBell, FaPlus, FaHome } from 'react-icons/fa';
import Cyrcle from '../RoundedImage';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({ color: '#0067A3' });
  const { background } = useSelector((state) => state.boardState);
  const { name } = useSelector((state) => state.userState);

  useEffect(() => {
    history.location.pathname.split('/')[1] === 'board'
      ? setState({ ...state, color: navBackgrounds[background] })
      : setState({ ...state, color: '#0067A3' });
  }, [background]);

  const handleRedirectHome = () => history.push('/');

  const handleModal = () => dispatch(showModal({ type: 'Board', data: {} }));

  const handleLogOut = () => dispatch(logOut());

  return (
    <nav style={{ backgroundColor: `${state.color}` }}>
      <div className="dropdown">
        <div className="pointer" id="dropdownMenuButton" data-toggle="dropdown">
          <Cyrcle size="small" data={name} />
        </div>
        <div className="dropdown-menu px-2" aria-labelledby="dropdownMenuButton">
          <button className="btn btn-danger btn-sm btn-block" onClick={handleLogOut}>
            Log out
          </button>
        </div>
      </div>

      <img src={logo} />

      <div className="d-flex">
        <div className="nav-item">
          <FaRegBell size={22} />
        </div>
        <div className="nav-item" onClick={handleRedirectHome}>
          <FaHome size={22} />
        </div>
        <div className="nav-item" onClick={handleModal}>
          <FaPlus size={22} />
        </div>
      </div>
    </nav>
  );
};
