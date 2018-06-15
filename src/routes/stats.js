"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("../logger/winston");
var botStats = {
    users: null,
    guilds: null
};
exports.statsEndpoint = function (router) {
    router.post('/stats', function (req, res, next) {
        console.log(res.headersSent);
        var apiKey = process.env['API_KEY'];
        if (!apiKey) {
            winston_1.logger.warn('A /stats endpoint was posted to but the bot api key ' +
                'env variable was not set, dropping request.');
            return next({ message: 'Stats service is unavailable.', code: 503 });
        }
        if (req.header('API_KEY') !== apiKey) {
            winston_1.logger.warn('An unauthorized request was made');
            winston_1.logger.warn(apiKey);
            winston_1.logger.warn(req.header('API_KEY'));
            return next({ message: 'Incorrect API key', code: 401 });
        }
        var users = req.query.users;
        if (!users) {
            winston_1.logger.warn("A /stats update was made without the 'users' parameter");
            return next({ message: "'users' parameter missing", code: 400 });
        }
        var guilds = req.query.guilds;
        if (!guilds) {
            winston_1.logger.warn("A /stats update was made without the 'guilds' parameter");
            return next({ message: "'guilds' parameter missing", code: 400 });
        }
        // Dangerous, change before prod
        botStats.users = Number(users);
        botStats.guilds = Number(guilds);
        console.log(botStats);
        winston_1.logger.info('A consumer has fetched stat information');
        res.send({ message: 'Data updated successfully', code: 200 });
    });
    router.get('/stats', function (req, res, next) {
        res.send({ stats: botStats, code: 200 });
    });
};
