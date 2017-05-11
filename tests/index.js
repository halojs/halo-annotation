import koa from 'koa'
import test from 'ava'
import request from 'request'
import Router from 'halo-router'
import { Readonly } from '../src'
import { generateRouterMaps } from 'halo-utils'

const req = request.defaults({
    json: true,
    baseUrl: 'http://localhost:3000'
})

test.before.cb((t) => {
    let app = new koa()
    let router = new Router({ dir: './tests' })
    
    router.maps(generateRouterMaps({ dir: './tests' }))

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