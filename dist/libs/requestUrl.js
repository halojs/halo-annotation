'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = RequestUrl;
function RequestUrl() {
    return function (target, name, descriptor) {
        return descriptor;
    };
}

['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'].map(item => RequestUrl[item] = item);