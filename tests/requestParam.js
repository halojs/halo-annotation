import { RequestUrl, RequestParam } from '../src'

export default class {
    @RequestUrl('/requestParam', RequestUrl.POST)
    @RequestParam('id', 'required', 'ID')
    @RequestParam('userName', 'email', '邮箱')
    @RequestParam('password', 'required maxlength=16', '密码')
    @RequestParam('arr', 'required array', '数组')
    async action(ctx, next) {
        ctx.body = 'requestParam'
    }
    
    @RequestParam('id', 'required', 'ID')
    notAsyncAction(ctx, next) {}
}