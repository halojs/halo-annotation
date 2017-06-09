import { isAbsolute, join, resolve } from 'path'

const ENABLED = process.env.MOCK_ENABLED
const DIR = resolve(join(process.cwd(), process.env.MOCK_DIR || ''))

export default function RequestMock(path, enabled = isEnabled()) {
    return function (target, name, descriptor) {
        if (enabled) {
            descriptor.value = async function(ctx, next) {
                try {
                    let module = required(toAbsolutePath(path))

                    if (isFunction(module)) {
                        module = module.call(target, ctx, next)
                    } else if (isAsyncFunction(module)) {
                        module = await module.call(target, ctx, next)
                    }

                    ctx.body = module
                } catch (e) {
                    ctx.status = 404
                    ctx.body = 'mock not found'
                }
            }
        }

        return descriptor
    }
}

function isEnabled() {
    return ENABLED === undefined ? true : (ENABLED === 'true' ? true : false)
}

function isFunction(func) {
    return func.constructor.name === 'Function'
}

function isAsyncFunction(func) {
    return func.constructor.name === 'AsyncFunction'
}

function required(path) {
    let obj = require(path)
    return obj && obj.__esModule ? obj.default : obj
}

function toAbsolutePath(path) {
    return isAbsolute(path) ? path : resolve(join(DIR, path))
}