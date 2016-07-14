
'use strict'
const fs = require('fs');
const bcrypt = require('bcrypt');

module.exports = User;

function User(username, password) {
  this.username = username;
  this.password = password;
  this.events = [ ];
  this.hashPassword();
  return this;
}

User.prototype.attend = function(event) {
      //just saving entire event object into user, repeated info, but not big deal here
      this.events.push(event);
};

User.prototype.hashPassword = function() {
  let hash = bcrypt.hashSync(this.password, 10)
  this.password = hash;
}
User.prototype.checkPass = function(pass) {
  return bcrypt.compare(pass, this.password);
}

User.prototype.getEvents = function() {
  return this.events;
}