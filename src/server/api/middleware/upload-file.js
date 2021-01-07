const fs = require('fs');

const storeFS = (data, cb) => {
    const { filePath, stream, filename, mimetype } = data;
    return new Promise((resolve, reject) => {
      stream
        .on('error', (error) => {
          // THERE IS NO ERROR ON VPS!
          console.log('error');
        })
        .pipe(fs.createWriteStream(filePath))
        .on('error', (error) => {
          // THERE IS NO ERROR ON VPS!
          console.log('pipe error');
          console.log(error);
        })
        .on('finish', () => {
          // THERE IS NO FINISH ON VPS!
          console.log('FINISHED !!!');
        });
    });
  };

  module.exports = storeFS;