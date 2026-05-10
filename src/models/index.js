'use strict';

const mongoose = require('mongoose');
const User = require('./User'); // File User.js mình vừa tạo lúc nãy

const db = {};

db.User = User;
db.mongoose = mongoose;

module.exports = db;