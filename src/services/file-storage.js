const fs = require('fs');
const Promise = require('bluebird');
const { storage } = require('pkgcloud');
const googleConfig = require('../config/google');
const progress = require('progress-stream');

const CONTAINER_NAME = 'dogfinder';

class FileStorage {
  constructor() {
    this.client = storage.createClient({
      provider: 'google',
      credentials: googleConfig,
      projectId: 'dogfinder-183313',
    });
  }

  upload(file, io) {
    return new Promise((resolve, reject) => {
      const remote = file.name;
      const stat = fs.statSync(file.path);

      const str = progress({
        length: stat.size,
        time: 1000, /* ms */
      });

      str.on('progress', (prog) => {
        io.emit('fileProgress', { prog, file });
      });

      const writeStream = this.client.upload({ container: CONTAINER_NAME, remote });
      writeStream.on('error', reject);
      writeStream.on('success', resolve);

      fs.createReadStream(file.path)
        .pipe(str)
        .pipe(writeStream);
    });
  }

  download(remotePath) {
    return this.client.download({ container: CONTAINER_NAME, remote: remotePath });
  }
}

module.exports = new FileStorage();
