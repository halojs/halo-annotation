'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = RequestMock;

var _path = require('path');

const ENABLED = process.env.MOCK_ENABLED;
const DIR = (0, _path.resolve)((0, _path.join)(process.cwd(), process.env.MOCK_DIR || ''));

function RequestMock(path, enabled = isEnabled()) {
    return function (target, name, descriptor) {
        if (enabled) {
            descriptor.value = async function (ctx, next) {
                try {
                    let module = required(toAbsolutePath(path));

                    if (isFunction(module)) {
                        module = module.call(target, ctx, next);
                    } else if (isAsyncFunction(module)) {
                        module = await module.call(target, ctx, next);
                    }

                    ctx.body = module;
                } catch (e) {
                    ctx.status = 404;
                    ctx.body = 'mock not found';
                }
            };
        }

        return descriptor;
    };
}

function isEnabled() {
    return ENABLED === undefined ? true : ENABLED === 'true' ? true : false;
}

function isFunction(func) {
    return func.constructor.name === 'Function';
}

function isAsyncFunction(func) {
    return func.constructor.name === 'AsyncFunction';
}

function required(path) {
    let obj = require(path);
    return obj && obj.__esModule ? obj.default : obj;
}

function toAbsolutePath(path) {
    return (0, _path.isAbsolute)(path) ? path : (0, _path.resolve)((0, _path.join)(DIR, path));
}