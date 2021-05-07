import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getUserData } from '../../../store/actions';

import Loader from '../../components/Loader';

const RedirectPage = () => {
  const { _id } = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem('KANBAN_USER_TOKEN', history.location.pathname.split('/')[2]);
    dispatch(getUserData(history.location.pathname.split('/')[3]));
  }, []);

  if (_id) history.push('/');

  return <Loader />;
};

export default RedirectPage;
