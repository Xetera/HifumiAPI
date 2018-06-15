"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testEndpoint = function (router) {
    router.get('/test', function (req, res, next) {
        res.send("You're in homie.");
    });
};
