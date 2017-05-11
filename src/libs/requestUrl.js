export default function RequestUrl() {
    return function (target, name, descriptor) {
        return descriptor
    }
}

['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'].map((item) => RequestUrl[item] = item)