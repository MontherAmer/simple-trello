import React from 'react';
import { useHistory } from 'react-router-dom';
import { parseJwt } from '../../../utils';
function withOutAuth(Wrapped) {
  return function (props) {
    let token = localStorage.getItem('KANBAN_USER_TOKEN');
    let { app } = parseJwt(token);
    if (app === 'KANBAN_SIMPLE_TRELLO') useHistory().push('/');
    return <Wrapped {...props} />;
  };
}

export default withOutAuth;
