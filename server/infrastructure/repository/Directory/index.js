'use strict';

const Directory = require('../../../domain/Directory');
const BaseRepository = require('../BaseRepository');

class DirectoryRepository extends BaseRepository {
  constructor() {
    super();
    this.model = this.db.models.directory;
  }

  async readById(id) {
    const directory = await this.model.findByPk(id, { raw: true });

    if (directory) return new Directory(directory);
    else return null;
  }

  async create(data) {
    const directory = await this.model.create(data);
    return new Directory(directory);
  }
}

module.exports = DirectoryRepository;
