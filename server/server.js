'use strict'

const http = require('http');
const hapi = require('hapi');
const boom = require('boom');

const Events = require('./models/events');
const Users = require('./models/users');
const Event = require('./models/event');
const User = require('./models/user');

let events = new Events();
let users = new Users();

const server = new hapi.Server;

server.connection({
  host: 'localhost',
  port: 9000,
});

server.route({
  method: 'GET',
  path: '/events',
  handler: function (request, response) {
    response(events.getAll());
  }
});

server.route({
  method: 'POST',
  path: '/events',

  handler: function (req, res) {
    let user = users.getOne(id);
    events.add(new Event(req.payload.name, user, req.payload.location));
    res(events.getAll());
  }
});

server.route({
  method: 'post',
  path: '/events/attend/{eventId}',
  handler: function (req, res) {
    let user = users.getOne(id);
    let event = events.getOne(req.params.eventId);
    user.attend(event);
    event.attended(user);
    users.save();
    events.save();
    res(user.getEvents());
  }
});

server.route({
  method: 'POST',
  path: '/user/create',
  handler: function(req, res) {
    let user = new User(req.payload.username, req.payload.password);
    users.add(user);
    res();
  }
});

server.route({
  method: 'POST',
  path: '/user/login',
  handler: function(req, res) {
    let user = users.getByNames(req.payload.username);
    if (!user.checkPass(req.payload.password)) {
      res(boom.badRequest('Incorrect username/password'))
    }
    res();
  }
});

server.start();