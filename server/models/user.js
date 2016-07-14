
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
  bcrypt.genSalt(10, function(err, salt) {
      if (err) console.log(err);
      bcrypt.hash(this.password, salt, function(err, hash) {
      if (err) console.log(err);        
      this.password = hash;
      });
    });
}
Users.prototype.checkPass = function(pass) {
  return bcrypt.compare(pass, this.password);
}

User.prototype.getEvents = function() {
  return.this.events;
}