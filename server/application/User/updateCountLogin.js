'use strict';

module.exports = (id, count, { UserRepository }) => UserRepository.updateCountLogin(id, count);