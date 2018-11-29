const userDao = require('./../dao/userDao.js');

const getUserById = async (userId) => {
  return userDao.getUserById(userId)
}

const login = async (user) => {
  return userDao.login(user)
} 

module.exports = {
  getUserById,
  login
}
