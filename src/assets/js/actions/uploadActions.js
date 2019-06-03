import { fileConstants } from '../constants';

export const recieveFile = res => (dispatch) => {
  dispatch({
    type: fileConstants.FILE_UPLOAD_FULLFILED,
    payload: res,
  });
};

export default { recieveFile };
