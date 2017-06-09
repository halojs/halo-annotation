import { isAbsolute, join, resolve } from 'path'

export default function RequestMock(path) {
    return function (target, name, descriptor) {

        descriptor.value = async function (...args) {
            let [ctx] = args
            try {
                let module = required(toAbsolutePath(path))

                switch (module.constructor.name) {
                    case 'Function':
                        ctx.body = module.apply(target, args)
                        break
                    case 'AsyncFunction':
                        ctx.body = await module.apply(target, args)
                        break
                    default:
                        ctx.body = module
                }
            } catch (e) {
                ctx.status = 404
                ctx.body = 'mock not found'
            }
        }

        return descriptor
    }
}

function required(path) {
    let obj = require(path)
    return obj && obj.__esModule ? obj.default : obj
}

function toAbsolutePath(path) {
    if (!isAbsolute(path)) {
        path = resolve(join(process.cwd(), process.env.HALO_MOCK_DIR || '', path))
    }
    return path
}