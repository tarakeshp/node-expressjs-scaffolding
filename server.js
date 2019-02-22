const Express = require('express');
const Config = require('./configs/config');
const Log = require("./src/common/log");
const Router = require('./src/router');
const http = require('http');
const https = require('https');
const fs = require('fs');
const sslOptions = {
    key: fs.readFileSync(Config.ssl.key),
    cert: fs.readFileSync(Config.ssl.cert)
}

'use strict';

let server = undefined;
App = Express();

if (Config.http === "https")
    server = https.createServer(sslOptions, App);
else
    server = http.createServer(App);

try {
    App.set("Router", new Router(App, Express));
    start_server();
} catch (e) {
    console.error(e);
}

function start_server() {
    server.timeout = 3000000; //3000000; //5minutes
    server.listen(Config.port, function () {
        Log.debug('App ' + Config.server_name + ' listening on port ' + Config.port + ' and mode ' + Config.environment);
        Log.debug(`${Config.http}://localhost:${Config.port}/`);
    });
}

process.on('uncaughtException', function (err) {
    console.log("UNCAUGHT EXCEPTION ");
    console.log("[Inside 'uncaughtException' event] " + err.stack || err.message);
});