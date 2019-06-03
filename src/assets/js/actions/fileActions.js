import filesService from '../services/files';
import { fileConstants } from '../constants';

const requestRemoveFile = props => ({
  type: fileConstants.REMOVE_FILE_REQUEST,
  props,
});

const recieveRemoveFile = res => ({
  type: fileConstants.REMOVE_FILE_FULLFILED,
  payload: res,
});

export const removeFile = props => async (dispatch) => {
  dispatch(requestRemoveFile(props));
  const res = await filesService.removeFile(props);
  dispatch(recieveRemoveFile(res));
};

export default { removeFile };
