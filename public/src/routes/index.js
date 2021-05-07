import WithAuth from '../layouts/hocs/WithAuth';
import WithOutAuth from '../layouts/hocs/WithOutAuth';

import Board from '../layouts/screens/Board';
import Home from '../layouts/screens/Home';
import Login from '../layouts/screens/Login';
import Signup from '../layouts/screens/Signup';
import RedirectScreen from '../layouts/screens/Redirect';

export default [
  { path: '/redirect', component: RedirectScreen, exact: false, key: 5 },
  { path: '/board/:id', component: WithAuth(Board), exact: true, key: 4 },
  { path: '/signup', component: WithOutAuth(Signup), exact: true, key: 3 },
  { path: '/login', component: WithOutAuth(Login), exact: true, key: 2 },
  { path: '/', component: WithAuth(Home), exact: false, key: 1 },
];
