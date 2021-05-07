import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { showModal } from '../../../store/actions';

import Nav from '../../components/NavBar';
import Thumbnail from '../../components/Board_Thumbnail';

import { FaRegStar, FaRegUser } from 'react-icons/fa';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { boards } = useSelector((state) => state.userState);

  const handleRedirect = (e) => history.push(`/board/${e}`);

  const handleBoardModal = () => dispatch(showModal({ type: 'Board', data: {} }));

  return (
    <div className="h-100">
      <Nav />
      <div className="home">
        {/* starred boards */}
        {boards?.starred.length ? (
          <div className="home-section mt-3">
            <div className="d-flex align-items-center">
              <FaRegStar size={30} /> &nbsp; &nbsp;
              <h3>Starred Boards</h3>
            </div>
            {boards?.starred?.length ? (
              <div className="home-section-body">
                {boards?.starred?.map((board, i) => (
                  <Thumbnail board={board} handleRedirect={handleRedirect} key={i} />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
        {/* personal boards */}
        <div className="home-section mt-3">
          <div className="d-flex align-items-center">
            <FaRegUser size={30} /> &nbsp; &nbsp;
            <h3>Personal Boards</h3>
          </div>
          <div className="h-100 d-flex flex-wrap ">
            {boards?.personal?.map((board, i) => (
              <Thumbnail board={board} handleRedirect={handleRedirect} key={i} />
            ))}
            <div className="thumbnail-creator" onClick={handleBoardModal}>
              Create new board
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
