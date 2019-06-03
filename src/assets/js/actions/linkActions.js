import linksService from '../services/link';
import { linkConstants } from '../constants';

const requestRemoveLink = props => ({
  type: linkConstants.REMOVE_LINK_REQUEST,
  props,
});

const recieveRemoveLink = res => ({
  type: linkConstants.REMOVE_LINK_FULLFILED,
  payload: res,
});

export const removeLink = props => async (dispatch) => {
  dispatch(requestRemoveLink(props));
  const res = await linksService.removeLink(props);
  dispatch(recieveRemoveLink(res));
};

export default { removeLink };
