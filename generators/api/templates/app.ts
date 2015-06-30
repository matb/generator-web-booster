/// <reference path='./typings/node/node.d.ts' />
/// <reference path='./typings/express/express.d.ts' />
/// <reference path='./typings/body-parser/body-parser.d.ts' />
/// <reference path='./typings/errorhandler/errorhandler.d.ts' />


import http = require('http');
import url = require('url');
import express = require('express');
import bodyParser = require('body-parser');
import errorHandler = require('errorhandler');

var app = express();

// Configuration
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;

if (env === 'development') {
    app.use(errorHandler({dumpExceptions: true, showStack: true}));
} else if (env === 'production') {
    app.use(errorHandler());
}

app.get('/', function (req:express.Request, res:express.Response) {
    res.json('Hallo1');
});

app.listen(port, function () {
    console.log('Demo Express server listening on port %d in %s mode', port, app.settings.env);
});