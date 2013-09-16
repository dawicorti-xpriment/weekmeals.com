var express = require('express');
var api = require('./api');
var mongoose = require('mongoose');

exports.initDB = function () {
    mongoose.connect('mongodb://localhost/weekmeals');
};

exports.run = function () {
    var app = express();

    exports.initDB();
    api.register('/api', app);
    app.listen(8888);
};