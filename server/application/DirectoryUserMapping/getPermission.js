'use strict';

module.exports = ( userId, directoryId, { DirectoryUserMappingRepository }) => DirectoryUserMappingRepository.read(userId, directoryId);