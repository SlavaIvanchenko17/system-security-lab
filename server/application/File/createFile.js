'use strict';

const File = require('../../domain/File');

module.exports = async (data, directoryId, {FileRepository}) => {
  data.forEach((item) => {
    const { originalname, path } = item;
    const date = new Date().getTime();
    const extension = originalname.split('.').pop();
    const filename = originalname.split('.').shift();
    const file = new File({
      filename, extension, date, path, directoryId
    });
    return FileRepository.create(file);
  });
};
