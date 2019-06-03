/* eslint consistent-return: off */

exports.isImage = function isImage(files) {
  if (Array.isArray(files)) {
    let f;
    for (let i = 0; i < files.length; i += 1) {
      f = files[i];
      if (!f.type.includes('image/')) {
        throw new TypeError('One or more of the files is not an image');
      }
    }
  } else if (!files.type.includes('image/')) {
    throw new TypeError('File is not an image');
  }
};
