'use strict'
const bcrypt = require('bcrypt');
const User = require('user');
const fs = require('fs');

module.exports = Users;

function Users() {
  this.users = this.load();
  return this;
};

Users.prototype.add = function (user) {
  user.id = this.users.length;
  this.users.push(user);
  this.save();
};

Users.prototype.getOne = function(id) {
  for (let i = 0; i< this.users.length; i++) {
    if (this.users[i].id === id) {
      return this.users[i];
    }
  }
}

Users.prototype.getByName = function(name) {
  for (let i = 0; i< this.users.length; i++) {
    if (this.users[i].username === name) {
      return this.users[i];
    }
  }
}

Users.prototype.getAll = function() {
  return this.users;
};

Users.prototype.load = function() {
  let that = this;
  fs.readFile('data/users.json','utf8', function(err, contents) {
    if (err) {
      console.log(err);
    }
    that.users = JSON.parse(contents);
  })
};

Users.prototype.save = function() {
  fs.writeFile('data/users.json', JSON.stringify(this.users));
}
