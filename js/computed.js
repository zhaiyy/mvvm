export function initComputed () {
    let vm = this
    let computed = this.$options.computed || {}
    for(let key in computed) {
        Object.defineProperty(vm, key, {
            get() {
                return  typeof computed[key] === 'function' ? computed[key].call(vm) : computed[key].get
            }
        })

    }
}