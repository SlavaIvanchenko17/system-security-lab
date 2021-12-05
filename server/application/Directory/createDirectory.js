'use strict';

const Directory = require('../../domain/Directory');

module.exports = async (data, {DirectoryRepository}) => DirectoryRepository.create(new Directory(data));