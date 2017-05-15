import koa from 'koa'
import test from 'ava'
import request from 'request'
import error from 'halo-error'
import Router from 'halo-router'
import { Readonly } from '../src'
import parameter from 'halo-parameter'
import { generateRouterMaps } from 'halo-utils'

const req = request.defaults({
    json: true,
    baseUrl: 'http://localhost:3000'
})

test.before.cb((t) => {
    let app = new koa()
    let router = new Router({ dir: './tests' })
    
    router.maps(generateRouterMaps({ dir: './tests' }))
    router.get('/requestParam', 'requestParam.action')

    app.use(error())
    app.use(parameter())
    app.use(router.routes())
    app.listen(3000, t.end)
})

test('Readonly', (t) => {
    class Foo {
        @Readonly
        prop() {}
    }

    t.false(Object.getOwnPropertyDescriptor(Foo.prototype, 'prop').writable)
    t.is(t.throws(() => (new Foo()).prop = 1).message, "Cannot assign to read only property 'prop' of object '#<Foo>'")
})

test.cb('RequestUrl', (t) => {
    req.get('/annotation', (err, res, body) => {
        t.is(body, 'RequestUrl annotation')
        t.end()
    })
})

test.cb('RequestParam, no params', (t) => {
    req.get('/requestParam', (err, res, body) => {
        t.is(res.statusCode, 422)
        t.is(body.message, 'Validation Failed')
        t.deepEqual(body.errors, [{
            field: 'id',
            rule: 'required',
            code: 'missing',
            message: '请输入ID'
        }])
        t.end()
    })
})

test.cb('RequestParam, params id = 1', (t) => {
    req.get('/requestParam', {
        qs: {
            id: 1
        }
    }, (err, res, body) => {
        t.is(res.statusCode, 422)
        t.is(body.message, 'Validation Failed')
        t.deepEqual(body.errors, [{
            field: 'password',
            rule: 'required',
            code: 'missing',
            message: '请输入密码'
        }])
        t.end()
    })
})

test.cb('RequestParam, params id = 1, password maxlength > 16', (t) => {
    req.post('/requestParam', {
        body: {
            id: 1,
            password: '01234567891234567'
        }
    }, (err, res, body) => {
        t.is(res.statusCode, 422)
        t.is(body.message, 'Validation Failed')
        t.deepEqual(body.errors, [{
            field: 'password',
            rule: 'maxlength',
            code: 'invalid',
            message: '密码的长度必须小于或等于16'
        }])
        t.end()
    })
})

test.cb('RequestParam, params id = 1, userName format does not match email', (t) => {
    req.post('/requestParam', {
        body: {
            id: 1,
            userName: 'abc'
        }
    }, (err, res, body) => {
        t.is(res.statusCode, 422)
        t.is(body.message, 'Validation Failed')
        t.deepEqual(body.errors, [{
            field: 'userName',
            rule: 'email',
            code: 'invalid',
            message: '邮箱的格式不正确'
        }])
        t.end()
    })
})