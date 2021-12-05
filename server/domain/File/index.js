'use strict';

class File {
  constructor(data) {
    const {
      id = null, filename, extension, date, path, directoryId,
    } = data;
    this.id = id;
    this.filename = filename;
    this.extension = extension;
    this.date = date;
    this.path = path;
    this.directoryId = directoryId;
  }
}

module.exports = File;
