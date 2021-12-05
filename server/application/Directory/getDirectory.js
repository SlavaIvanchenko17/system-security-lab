'use strict';

module.exports = async (id, {DirectoryRepository}) => DirectoryRepository.readById(id);