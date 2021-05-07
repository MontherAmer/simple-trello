import React from 'react';
import { useHistory } from 'react-router-dom';
import { parseJwt } from '../../../utils';

function withAuth(Wrapped) {
  return function (props) {
    let token = localStorage.getItem('KANBAN_USER_TOKEN');
    let { app } = parseJwt(token);
    if (!token) useHistory().push('/login');
    if (!app) useHistory().push('/login');
    return <Wrapped {...props} />;
  };
}

export default withAuth;
