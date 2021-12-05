'use strict';

const bcrypt = require('bcrypt');
const User = require('../../domain/User');

module.exports = async (data, { UserRepository }) => {
    const { email, password } = data;
    const user = new User({
        email: email,
        password: bcrypt.hashSync(password, 10),
    });

    return UserRepository.create(user);
};