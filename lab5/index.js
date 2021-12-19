'use strict';

const crypto = require('crypto');
const fs = require('fs');

(function generateKeyFiles() {
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: ''
        }
    });

    fs.writeFileSync("public_key", keyPair.publicKey);
    fs.writeFileSync("private_key", keyPair.privateKey);
})();

const encryptString = (plaintext, publicKeyFile) => {
    const publicKey = fs.readFileSync(publicKeyFile, "utf8");
    const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(plaintext));

    return encrypted.toString("base64");
};

const decryptString = (ciphertext, privateKeyFile) => {
    const privateKey = fs.readFileSync(privateKeyFile, "utf8");
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey,
            passphrase: '',
        },
        Buffer.from(ciphertext, "base64")
    );

    return decrypted.toString("utf8");
}

//Usage
const plainText = 'Lab5';
const encrypted = encryptString(plainText, "./public_key");

console.log("Encrypted: ", encrypted);
console.log("Decrypted: ", decryptString(encrypted, "private_key"));