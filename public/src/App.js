import React, { useContext } from 'react';
import routes from './routes';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ShowCreateContext } from './context/ShowCreateContext';
import Modal from './layouts/components/Modal';
import Loader from './layouts/components/Loader';

const App = () => {
  const { showModal, modalType, showLoader } = useSelector((state) => state.utilsState);
  const { updateShowCreate } = useContext(ShowCreateContext);
  return (
    <div className="App" id="off" onClick={updateShowCreate}>
      <Router>
        <Switch>
          {routes.map((route) => (
            <Route key={route.key} path={route.path} render={() => <route.component />} exact={route.exact} />
          ))}
        </Switch>
      </Router>
      {showModal ? (
        <div className="containerx">
          <Modal type={modalType} />
        </div>
      ) : null}
      {showLoader ? <Loader /> : null}
    </div>
  );
};

export default App;
