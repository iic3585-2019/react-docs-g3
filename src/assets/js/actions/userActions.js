import userService from '../services/user';
import { userConstants } from '../constants';

const requestUser = data => ({
  type: userConstants.USER_REQUEST,
  data,
});

const receiveResponse = (data, res) => ({
  type: userConstants.USER_REQUEST_FULLFILED,
  payload: res,
  data,
});

const rejectResponse = (userId, data) => ({
  type: userConstants.USER_REQUEST_REJECTED,
  payload: data.error,
  data,
});

export const getUser = userId => async (dispatch) => {
  dispatch(requestUser(userId));
  const res = await userService.get(userId);

  if (res.error) {
    dispatch(rejectResponse(userId, res));
  } else {
    dispatch(receiveResponse(userId, res));
  }
};

export default { getUser };
