import { RequestMock, RequestUrl } from '../src'
export default class {
    @RequestUrl('/mockNotOverride', RequestUrl.GET)
    async fileMock(ctx, next) {
        ctx.body = 'this is a mock'
    }
    
    @RequestUrl('/mockNotFound', RequestUrl.GET)
    @RequestMock(`${process.cwd()}/mock/obj.js`)
    async noFileMock(ctx, next) {
        ctx.body = 'this is a mock'
    }
    
    @RequestUrl('/mockOverride', RequestUrl.GET)
    @RequestMock(`${process.cwd()}/tests/mock/obj`)
    async overrideMock(ctx, next) {
        ctx.body = 'this is a mock'
    }
    
    @RequestUrl('/mockOverrideReturnFunction', RequestUrl.GET)
    @RequestMock(`./mock/function`)
    async mockOverrideReturnFunction(ctx, next) {
        ctx.body = 'this is a mock'
    }
    
    @RequestUrl('/mockOverrideReturnAsyncFunction', RequestUrl.GET)
    @RequestMock(`./mock/asyncFunction`)
    async mockOverrideReturnAsyncFunction(ctx, next) {
        ctx.body = 'this is a mock'
    }
    
    @RequestUrl('/mockOverrideByEnv', RequestUrl.GET)
    @RequestMock(`./mock/obj.js`)
    async relativeMock(ctx, next) {
        ctx.body = 'this is a mock'
    }
}