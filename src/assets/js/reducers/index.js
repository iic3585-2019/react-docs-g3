import { combineReducers } from 'redux';
import course from './courseReducer';
import auth from './authReducer';
import user from './userReducer';

export default combineReducers({
  course,
  auth,
  user,
});
