"use strict";

var express = require('express'),
    app = express(),
    path = require('path');

function StaticServer() {
    this._serverRoot = path.join(__dirname, '../');
    this._temperature = 22;
};

/**
 * Start method of the server.
 * Serves only static resources.
 * If you send a temperature to the server than it changes it's local temperature and when you get it
 * you will retrieve the current temperature.
 */
StaticServer.prototype.start = function () {
    var self = this;

    app.use('/public', express.static(this._serverRoot + '/public'));
    app.use('/applications', express.static(this._serverRoot + '/applications'));
    app.use('/components', express.static(this._serverRoot + '/components'));
    app.use('/tests', express.static(this._serverRoot + '/tests'));
    app.use(express.favicon(this._serverRoot + '/public/resources/favicon.ico'));
    app.use(function(req, res, next){
        if(req.method === 'POST' && Object.keys(req.query).length > 0) {
            var query = req.query;
            if(query.temperature) {
                self._temperature = query.temperature;
                res.send(200);
            }
        } else if(req.method === 'GET' && req.path.indexOf('temperature') !== -1)  {
            res.set('Cache-Control', 'no-cache, must-revalidate');
            res.set('Pragma', 'no-cache');
            res.send(self._temperature.toString());
        } else {
            console.log(req.path);
            res.send(404);
        }
    });
    app.listen(8083);
};

var serverInstance = new StaticServer();
serverInstance.start();

