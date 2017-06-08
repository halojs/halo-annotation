'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = RequestMock;

var _path = require('path');

/* istanbul ignore next */
function RequestMock(path, override = false) {
    return function (target, name, descriptor) {
        if (override) {
            path = (0, _path.isAbsolute)(path) ? path : (0, _path.resolve)((0, _path.join)(process.cwd(), path));

            descriptor.value = async function (ctx, next) {
                console.log('mock', path);
                try {
                    ctx.body = required(path);
                } catch (e) {
                    ctx.status = 404;
                    ctx.body = 'mock not found';
                }
            };
        }
        return descriptor;
    };
}

function required(path) {
    let obj = require(path
    /* istanbul ignore next */
    );return obj && obj.__esModule ? obj.default : obj;
}