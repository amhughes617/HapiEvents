
'use strict'
const fs = require('fs');

module.exports = Event;

function Event(name, host, location) {
  this.name = name;
  this.host = host;
  this.location = location;
  this.attendees = [ ];
  return this;
}

Event.prototype.attended = function(user) {
      //just saving entire event object into Event, repeated info, but not big deal here
      this.attendees.push(user);
};