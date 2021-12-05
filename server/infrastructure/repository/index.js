'use strict';

const FileRepository = require('./File');
const DirectoryRepository = require('./Directory');
const DirectoryUserMappingRepository = require('./DirectoryUserMapping');
const SystemLogRepository = require('./SystemLog');
const UserRepository = require('./User');

module.exports = {
  FileRepository: new FileRepository(),
  DirectoryRepository: new DirectoryRepository(),
  DirectoryUserMappingRepository: new DirectoryUserMappingRepository(),
  SystemLogRepository: new SystemLogRepository(),
  UserRepository: new UserRepository()
};
