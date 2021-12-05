'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getUserbyEmail = require('../../application/User/getUserbyEmail');
const updateCountLogin = require('../../application/User/updateCountLogin');
const blockUser = require('../../application/User/blockUser');
const repositories = require('../../infrastructure/repository');

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserbyEmail({ email: email }, repositories);

    if (!user) {
        throw Error('Invalid email');
    }

    if (user.isBlocked) {
        res.status(401).json({
            message: 'User Blocked',
        });
    }

    if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ user }, 'SecretKey', { expiresIn: '2h' });
        await updateCountLogin(user.id, 0, repositories);
        res.json({ user, token });
    } else {
        if (user.countLogin > 4) await blockUser(user.id, repositories);
        await updateCountLogin(user.id, user.countLogin + 1, repositories);
        res.status(401).json({
            message: 'Unauthenticated',
        });
    }
};

module.exports = login;