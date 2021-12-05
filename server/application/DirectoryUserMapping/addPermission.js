'use strict';

const DirectoryUserMapping = require('../../domain/DirectoryUserMapping');

module.exports = async (data, { DirectoryUserMappingRepository }) => {
    const mapping = new DirectoryUserMapping(data);

    return DirectoryUserMappingRepository.create(mapping);
};