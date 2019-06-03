const fileStorage = require('../../services/file-storage');
const bytes = require('bytes');

const IMG_URL = 'https://storage.googleapis.com/dogfinder';

exports.upload = async function upload(ctx, files, fields, io) {
  Object.keys(files).forEach(async (key) => {
    const f = files[key];
    try {
      const body = {
        size: bytes(f.size),
        filename: f.name,
        extension: f.name.split('.').pop(),
        path: `${IMG_URL}/${f.name}`,
        username: fields.user,
        courseNumber: fields.courseNumber,
      };
      console.log(`uploading: ${key} to ${fields.courseNumber} from ${fields.user}`);
      try {
        const filedUploaded = await fileStorage.upload(f, io);
        console.log(fileUploaded);
        const file = await ctx.orm.Files.build(body).save();
        io.emit('fileUploaded', { file });
      } catch (e) {
        console.log(e);
        return e;
      }
    } catch (e) {
      return { error: true, message: e.errors };
    }

    return { success: true };
  });
};
