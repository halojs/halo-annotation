import { RequestMock, RequestUrl } from '../src'
export default class {
    @RequestUrl('/mockNotOverride', RequestUrl.GET)
    @RequestMock(`${process.cwd()}/tests/mock.js`, false)
    async fileMock(ctx, next) {
        ctx.body = 'this is a mock'
    }
    
    @RequestUrl('/mockNotFound', RequestUrl.GET)
    @RequestMock(`${process.cwd()}/mock.js`, true)
    async noFileMock(ctx, next) {
        ctx.body = 'this is a mock'
    }
    
    @RequestUrl('/mockOverride', RequestUrl.GET)
    @RequestMock(`${process.cwd()}/tests/mock`, true)
    async overrideMock(ctx, next) {
        ctx.body = 'this is a mock'
    }
    
    @RequestUrl('/mockOverrideRelativePath', RequestUrl.GET)
    @RequestMock(`tests/mock.js`, true)
    async relativeMock(ctx, next) {
        ctx.body = 'this is a mock'
    }
}