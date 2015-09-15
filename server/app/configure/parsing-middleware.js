'use strict';
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function (app) {

    // Important to have this before any session middleware
    // because what is a session without a cookie?
    // No session at all.
    app.use(cookieParser());
    app.use(session({secret:'cauliflower'}));
    // Parse our POST and PUT bodies.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

};
