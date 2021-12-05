'use strict';

const express = require('express');
const { withJWTAuthMiddleware } = require('express-kun');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const controller = require('../controllers');
const login = require('../auth');
const destination = require('../../infrastructure/multer');

const app = express();
const router = express.Router();

const protectedRouter = withJWTAuthMiddleware(router, "SecretKey");

app.use(cors());
app.use(morgan('dev'));

let upload = multer({
  dest: destination,
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});


protectedRouter.get('/file/:id', controller.downloadFile);
protectedRouter.get('/files', controller.getFiles);
protectedRouter.post('/file', express.json(), upload.array('file'), controller.uploadFile);
protectedRouter.delete('/file/:id', controller.deleteFile);

router.post('/login', express.json(), login);
protectedRouter.get('/users', controller.getUsers);
router.post('/user', express.json(), controller.createUser);
protectedRouter.put('/user/unblock/:id', controller.unBlockUser);

protectedRouter.post('/dir', express.json(), controller.createDirectory);

protectedRouter.get('/logs', controller.getLogs);

protectedRouter.post('/permission', express.json(), controller.addPermission);
protectedRouter.delete('/permission/:id', controller.deletePermission);

app.use(router);

app.listen(8080, () => {
  console.log('app is running');
});
