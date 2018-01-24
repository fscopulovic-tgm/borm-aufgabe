// Class that contains the user information
var bcrypt   = require('bcrypt-nodejs');
var database = require('../database.js');

module.exports = {

  addUser(email, name, password) {
    var newUser = {
      'email' : email
      'username' : name
      'password' : password
    }
    database.upsertUser(newUser)
  }

  findUser(email) {
    // TODO implement to find a user
  }

  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(128), null);
  };

  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  };
};
