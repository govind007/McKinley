const mongoose = require('mongoose');
const config = require('./');
// const join = require('path').join;

// const models = join(__dirname, '../models');

mongoose.promise = global.Promise;

mongoose.connect(config.db, {
    useNewUrlParser: true,
    socketTimeoutMS: 0,
    poolSize: 15,
    keepAlive: 5000,
    reconnectTries: 30
});

module.exports = mongoose.connection;
