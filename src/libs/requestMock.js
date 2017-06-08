import { isAbsolute, join, resolve } from 'path'
/* istanbul ignore next */
export default function RequestMock(path, override = false) {
    return function (target, name, descriptor) {
        if (override) {
            path = isAbsolute(path) ? path : resolve(join(process.cwd(), path))

            descriptor.value = async function (ctx, next) {
                console.log('mock', path)
                try {
                    ctx.body = required(path)
                } catch (e) {
                    ctx.status = 404
                    ctx.body = 'mock not found'
                }
            }
        }
        return descriptor
    }
}

function required(path) {
    let obj = require(path)
    /* istanbul ignore next */
    return obj && obj.__esModule ? obj.default : obj
}