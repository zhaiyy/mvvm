export function initMethods () {
    let vm = this
    let methods = this.$options.methods || {}
    for(let key in methods) {
        Object.defineProperty(vm, key, {
            get() {
                return methods[key]
            }
        })

    }
}