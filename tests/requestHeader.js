import { RequestUrl, RequestHeader } from '../src'

export default class {
    @RequestUrl('/requestHeader', RequestUrl.POST)
    @RequestHeader('userid', 'required', '用户ID')
    @RequestHeader('username', 'email', '邮箱')
    @RequestHeader('password', 'required maxlength=16', '密码')
    @RequestHeader('arr', 'required array', '数组')
    async action(ctx, next) {
        ctx.body = 'requestHeader'
    }

    @RequestHeader('userid', 'required', '用户ID')
    notAsyncAction(ctx, next) {}
}