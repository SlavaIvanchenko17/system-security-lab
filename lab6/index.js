'use strict';

const crypto = require('crypto');

const plainText = 'lab6';

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

const signature = (plainText, privateKey) => crypto.sign('SHA256', Buffer.from(plainText), privateKey);

const isVerified = (plainText, publicKey, signature) => crypto.verify('SHA256', Buffer.from(plainText), publicKey, signature);

const sign = signature(plainText, privateKey);

console.log(`Is signature verified: ${isVerified(plainText, publicKey, sign)}`);