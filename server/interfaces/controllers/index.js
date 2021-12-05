'use strict';

const fs = require('fs');
const { promisify } = require('util');
const repositories = require('../../infrastructure/repository');
const service = require('../../application');


const unlinkAsync = promisify(fs.unlink);

const uploadFile = async (req, res) => {
  try {
    const user = res.locals.decoded.user;

    const permission = await service.getPermission(
        Number(user.id),
        Number(req.query.directoryId),
        repositories
    );

    if (user.isAdmin) {
      await service.createFile(req.files, Number(req.query.directoryId), repositories);
      await service.createLog({
        userId: user.id,
        message: 'upload file(Admin)'
      }, repositories);
      res.json('upload');
    } else {
      if (permission) {
        await service.createFile(req.files, Number(req.query.directoryId), repositories);
        await service.createLog({
          userId: user.id,
          message: 'upload file'
        }, repositories);
        res.json('upload');
      } else {
        await service.createLog({
          userId: user.id,
          message: 'Access denied(upload file)'
        }, repositories);
        res.json('Access denied');
      }
    }
  } catch (error) {
    console.error(error);
    res.send('upload error');
  }
};

const createUser = async (req, res) => {
  try {
    const passwordLength = req.body.password.split('').length;
    if (passwordLength === 5) {
      await service.createUser(req.body, repositories);
      res.json('create User');
    } else {
      res.json('password length must be 5');
    }
  } catch (error) {
    console.error(error);
    res.send('create error');
  }
};

const getUsers = async (req, res) => {
  try {
    const user = res.locals.decoded.user;

    if (user.isAdmin) {
      const users = await service.getUsers(repositories);
      await service.createLog({
        userId: user.id,
        message: 'get registration logs(Admin)'
      }, repositories);
      res.json(users);
    } else {
      await service.createLog({
        userId: user.id,
        message: 'get registration logs(Access denied)'
      }, repositories);
      res.json('Access denied');
    }
  } catch (error) {
    console.error(error);
    res.send('Not found');
  }
};

const getLogs = async (req, res) => {
  try {
    const user = res.locals.decoded.user;

    if (user.isAdmin) {
      const logs = await service.getLogs(repositories);
      await service.createLog({
        userId: user.id,
        message: 'get system logs(Admin)'
      }, repositories);
      res.json(logs);
    } else {
      await service.createLog({
        userId: user.id,
        message: 'get system logs(Access denied)'
      }, repositories);
      res.json('Access denied');
    }
  } catch (error) {
    console.error(error);
    res.send('Not found');
  }
};

const downloadFile = async (req, res) => {
  try {
    const user = res.locals.decoded.user;

    const permission = await service.getPermission(
        Number(user.id),
        Number(req.query.directoryId),
        repositories
    );

    if (user.isAdmin) {
      const file = await service.getFileById(req.params.id, repositories);
      const { path } = file;
      await service.createLog({
        userId: user.id,
        message: 'download file(Admin)'
      }, repositories);
      res.download(path);
    } else {
      if (permission) {
        const file = await service.getFileById(req.params.id, repositories);
        const { path } = file;
        await service.createLog({
          userId: user.id,
          message: 'download file'
        }, repositories);
        res.download(path);
      } else {
        await service.createLog({
          userId: user.id,
          message: 'Access denied(download file)'
        }, repositories);
        res.json('Access denied');
      }
    }
  } catch (error) {
    console.error(error);
    res.send('download error');
  }
};

const deleteFile = async (req, res) => {
  try {
    const user = res.locals.decoded.user;

    const permission = await service.getPermission(
        Number(user.id),
        Number(req.query.directoryId),
        repositories
    );

    if (user.isAdmin) {
      const file = await service.getFileById(req.params.id, repositories);
      await service.deleteFile(req.params.id, repositories);
      const { path } = file;
      await service.createLog({
        userId: user.id,
        message: 'delete file(Admin)'
      }, repositories);
      res.json('deleted');
      return unlinkAsync(path);
    } else {
      if (permission) {
        const file = await service.getFileById(req.params.id, repositories);
        await service.deleteFile(req.params.id, repositories);
        const { path } = file;
        await service.createLog({
          userId: user.id,
          message: 'delete file'
        }, repositories);
        res.json('deleted');
        return unlinkAsync(path);
      } else {
        await service.createLog({
          userId: user.id,
          message: 'Access denied(delete file)'
        }, repositories);
        res.json('Access denied');
      }
    }
  } catch (error) {
    console.error(error);
    res.send('delete error');
  }
};

const getFiles = async (req, res) => {
  try {
    const user = res.locals.decoded.user;

    const permission = await service.getPermission(
        Number(user.id),
        Number(req.query.directoryId),
        repositories
    );

    if (user.isAdmin) {
      const result = await service.getFiles({directoryId: Number(req.query.directoryId)}, repositories);
      await service.createLog({
        userId: user.id,
        message: 'get files(Admin)'
      }, repositories);
      res.json(result);
    } else {
      if (permission) {
        const result = await service.getFiles({directoryId: Number(req.query.directoryId)}, repositories);
        await service.createLog({
          userId: user.id,
          message: 'get files'
        }, repositories);
        res.json(result);
      } else {
        await service.createLog({
          userId: user.id,
          message: 'Access denied(get files)'
        }, repositories);
        res.json('Access denied');
      }
    }
  } catch (error) {
    console.error(error);
    res.send('Not found');
  }
};

const createDirectory = async (req, res) => {
  try {
    const user = res.locals.decoded.user;

    if (user.isAdmin) {
      const dir = await service.createDirectory(req.body, repositories);
      res.json(dir);
      await service.createLog({
        userId: user.id,
        message: 'create directory(Admin)'
      }, repositories);
    } else {
      await service.createLog({
        userId: user.id,
        message: 'create directory(Access denied)'
      }, repositories);
      res.json('Access denied');
    }
  } catch (error) {
    console.error(error);
    res.send('create error');
  }
};

const addPermission = async (req, res) => {
  try {
    const user = res.locals.decoded.user;

    if (user.isAdmin) {
      const permissions = await service.addPermission(req.body, repositories);
      res.json(permissions);
      await service.createLog({
        userId: user.id,
        message: 'add permission(Admin)'
      }, repositories);
    } else {
      await service.createLog({
        userId: user.id,
        message: 'add permission(Access denied)'
      }, repositories);
      res.json('Access denied');
    }
  } catch (error) {
    console.error(error);
    res.send('create error');
  }
};

const deletePermission = async (req, res) => {
  try {
    const user = res.locals.decoded.user;

    if (user.isAdmin) {
      await service.deletePermission(req.params.id, repositories);
      res.json('deleted');
      await service.createLog({
        userId: user.id,
        message: 'delete permission(Admin)'
      }, repositories);
    } else {
      await service.createLog({
        userId: user.id,
        message: 'delete permission(Access denied)'
      }, repositories);
      res.json('Access denied');
    }
  } catch (error) {
    console.error(error);
    res.send('delete error');
  }
};

const unBlockUser = async (req, res) => {
  try {
    const user = res.locals.decoded.user;

    if (user.isAdmin) {
      await service.unBlockUser(req.params.id, repositories);
      res.json('user unblock');
      await service.createLog({
        userId: user.id,
        message: 'unblock user(Admin)'
      }, repositories);
    } else {
      await service.createLog({
        userId: user.id,
        message: 'unblock user(Access denied)'
      }, repositories);
      res.json('Access denied');
    }
  } catch (error) {
    console.error(error);
    res.send('unblock error');
  }
};

module.exports = {
  uploadFile,
  downloadFile,
  deleteFile,
  getFiles,
  createDirectory,
  createUser,
  addPermission,
  deletePermission,
  unBlockUser,
  getUsers,
  getLogs,
};
