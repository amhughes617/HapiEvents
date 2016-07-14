'use strict'
const bcrypt = require('bcrypt');
const User = require('user');
const fs = require('fs');

module.exports = Events;

function Events() {
  this.events = this.load();
  return this;
};

Events.prototype.add = function (event) {
  event.id = this.events.length;
  this.events.push(event);
  this.save();
};

Events.prototype.getOne = function(id) {
  for (let i = 0; i< this.books.length; i++) {
    if (this.events[i].id === id) {
      return this.events[i];
    }
  }
}

Events.prototype.getAll = function() {
  return this.events;
};

Events.prototype.load = function() {
  let that = this;
  fs.readFile('data/events.json','utf8', function(err, contents) {
    if (err) {
      console.log(err);
    }
    that.events = JSON.parse(contents);
  })
};

Events.prototype.save = function() {
  fs.writeFile('data/vents.json', JSON.stringify(this.vents));
}
