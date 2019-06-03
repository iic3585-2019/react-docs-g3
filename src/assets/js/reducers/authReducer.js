import { userConstants } from '../constants';

export default function reducer(state = {
  user: undefined,
  error: null,
  signingIn: false,
}, action) {
  switch (action.type) {
    case userConstants.AUTH_REQUEST: {
      return { ...state, signingIn: true };
    }

    case userConstants.AUTH_REQUEST_REJECTED: {
      return { ...state, signingIn: false, error: action.payload };
    }

    case userConstants.AUTH_REQUEST_FULLFILED: {
      return { ...state, signingIn: false, user: action.payload };
    }

    case userConstants.SIGNOUT_REQUEST: {
      return { ...state, signingOut: true };
    }

    case userConstants.SIGNOUT_REQUEST_REJECTED: {
      return { ...state, signOut: false, error: action.payload };
    }

    case userConstants.SIGNOUT_REQUEST_FULLFILED: {
      return { ...state, user: null };
    }

    default:
      return { ...state };
  }
}
