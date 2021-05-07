import { combineReducers } from 'redux';

import userState from './_users';
import utilsState from './_utils';
import boardState from './_board';

export default combineReducers({ userState, utilsState, boardState });
