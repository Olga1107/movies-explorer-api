const usersRout = require('express').Router();
const { validationUserId, validationUpdateUser } = require('../middlewares/validations');
const {
  getUser,
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

usersRout.get('/me', getCurrentUser);
usersRout.get('/:userId', validationUserId, getUser);
usersRout.patch('/me', validationUpdateUser, updateUser);

module.exports = usersRout;
