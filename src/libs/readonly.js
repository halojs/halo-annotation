export default function Readonly(target, name, descriptor) {
    descriptor.writable = false
    return descriptor
}