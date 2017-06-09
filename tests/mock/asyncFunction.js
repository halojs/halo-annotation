export default async function (ctx) {
    return await new Promise(resolve => {
        setTimeout(_ => {
            resolve({ name: 1 })
        }, 0)
    })
}