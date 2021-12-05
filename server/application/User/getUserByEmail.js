'use strict';

module.exports = (data, { UserRepository }) => UserRepository.readByEmail(data);