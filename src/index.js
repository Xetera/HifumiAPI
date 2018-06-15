"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var http = require("http");
var bodyParser = require("body-parser");
var subdomain = require("express-subdomain");
var morgan = require("morgan");
// Get our API routes
var endpoint_1 = require("./routes/endpoint");
var winston_1 = require("./logger/winston");
var app = express();
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(morgan('combined'));
app.use(subdomain('api', endpoint_1.endpoint));
// Catch all other routes and return the index file
/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '3000';
app.set('port', port);
/**
 * Create HTTP server.
 */
var server = http.createServer(app);
/**
 * Setting the subdomain
 */
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () { return winston_1.logger.info("API running on localhost:" + port); });
exports.secret = process.env['UPLOAD_KEY'];
