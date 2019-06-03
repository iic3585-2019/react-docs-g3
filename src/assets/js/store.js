import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import _ from 'lodash';
import thunk from 'redux-thunk';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const auth = () => store => next => (action) => {
  // Get the state before and after the action was performed
  const previousToken = store.getState().auth.user;
  next(action);
  const nextToken = store.getState().auth.user;

  // Respond to changes
  if (nextToken !== previousToken) localStorage.setItem('currentUser', nextToken);
};

// Get initial state from localStorage
const token = localStorage.getItem('currentUser');
const initialState = token
  ? _.set({}, 'auth.user.currentUser', token)
  : {};

const middleware = applyMiddleware(thunk, createLogger(), auth());
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, initialState, middleware);
export const persistor = persistStore(store);
