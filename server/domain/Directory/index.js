'use strict';

class Directory {
  constructor(data) {
    const {
      id = null, path
    } = data;
    this.id = id;
    this.path = path;
  }
}

module.exports = Directory;
