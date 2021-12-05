'use strict'

const fs = require('fs');
const service = require('../../application');
const repository = require('../repository');

module.exports = async (req, file, callback) => {
    try {
        const user = req.res.locals.decoded.user;
        const dir = await service.getDirectory(Number(req.query.directoryId), repository);

        if (user.isAdmin) {
            if (dir) {
                let path = `${__dirname}${dir.path}`;
                if (fs.existsSync(path)) {
                    callback(null, path);
                } else {
                    fs.mkdirSync(path);
                    callback(null, path);
                }
            } else {
                callback(new Error('folder does not exist'));
            }
        } else {
            const permission = await service.getPermission(
                Number(req.res.locals.decoded.user.id),
                Number(req.query.directoryId),
                repository
            );

            if (permission) {
                if (dir) {
                    let path = `${__dirname}${dir.path}`;
                    if (fs.existsSync(path)) {
                        callback(null, path);
                    } else {
                        fs.mkdirSync(path);
                        callback(null, path);
                    }
                } else {
                    callback(new Error('folder does not exist'));
                }
            } else {
                callback(new Error('Access Denied'));
            }
        }
    } catch (e) {
        console.error(e);
    }
};