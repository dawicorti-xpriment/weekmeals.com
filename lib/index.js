var express = require('express');
var api = require('./api');
var mongoose = require('mongoose');
var path = require('path');

exports.initDB = function () {
    mongoose.connect('mongodb://localhost/weekmeals');
};

exports.run = function () {
    var app = express();

    exports.initDB();
    app.use(express.static(path.normalize(path.join(__dirname, '..', 'public'))));
    api.register('/api', app);
    app.listen(8888);
};