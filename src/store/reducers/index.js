// import user from './user';
// import wallet from './wallet';

import { combineReducers } from 'redux';
import userReducer from './user';

const rootReducer = combineReducers({ userReducer });

export default rootReducer;
