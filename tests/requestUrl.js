import { RequestUrl } from '../src'

export default class {
    @RequestUrl('/annotation', RequestUrl.GET)
    async action(ctx, next) {
        ctx.body = 'RequestUrl annotation'
    }
}