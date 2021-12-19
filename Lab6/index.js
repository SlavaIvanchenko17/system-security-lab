'use strict';

const crypto = require('crypto');

const message = 'Lab6';
const data = Buffer.from(message);

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

const signature = crypto.sign('SHA256', data , privateKey);

const isVerified = crypto.verify('SHA256', data, publicKey, signature);

console.log(`Is signature verified: ${isVerified}`);