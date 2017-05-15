"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Readonly;
function Readonly(target, name, descriptor) {
    descriptor.writable = false;
    return descriptor;
}