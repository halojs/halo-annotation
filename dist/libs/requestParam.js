'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = RequestParam;

var _haloUtils = require('halo-utils');

var _haloError = require('halo-error');

function RequestParam(field = '', rules = '', label = '') {
    rules = rules.split(' ').map(item => item.includes('=') ? item.split('=') : item);

    return function (target, name, descriptor) {
        let oldValue = descriptor.value;

        if (!isAsyncFunction(descriptor.value)) {
            return descriptor;
        }

        descriptor.value = async function (ctx, next) {
            let value, result;

            value = ctx.getParameters(field);

            if (value.length === 0) {
                if (!rules.includes('required')) {
                    return await oldValue(ctx, next);
                }

                value.push('');
            }

            if (!(result = validator(field, label, value, rules))) {
                await oldValue(ctx, next);
            } else {
                throw new _haloError.ValidationError(result);
            }
        };

        return descriptor;
    };
}

function isAsyncFunction(func) {
    return func.constructor.name === 'AsyncFunction';
}

function validator(field, label, value, rules) {
    let result = null;

    for (let item of rules) {
        let ruleObj, params, ruleName;

        if (Array.isArray(item)) {
            params = item[1];
            ruleName = item[0];
        } else {
            ruleName = item;
        }

        ruleObj = _haloUtils.rule.getRule(ruleName);

        if (!ruleObj.exec(value, params)) {
            result = {
                field,
                rule: ruleName,
                code: item === 'required' ? 'missing' : 'invalid',
                message: ruleObj.message.replace('{{text}}', label).replace(`{{${ruleName}}}`, params || '')
            };

            break;
        }
    }

    return result;
}