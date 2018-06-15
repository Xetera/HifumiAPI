"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
function dropletEndpoint(router) {
    router.get('/droplet', function (req, res, next) {
        child_process_1.exec('');
    });
}
exports.dropletEndpoint = dropletEndpoint;
