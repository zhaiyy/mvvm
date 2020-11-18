// 发布订阅模式  订阅和发布 如[fn1, fn2, fn3]
export function Dep() {
    // 一个数组(存放函数的事件池)
    this.subs = [];
}
Dep.prototype = {
    addSub(sub) {  
        this.subs.push(sub);    
    },
    notify() {
        // 绑定的方法，都有一个update方法
        this.subs.forEach(sub => {
            sub.update()
        });
    }
};
export function Watcher (vm, exp, fn) {
    this.fn = fn
    this.vm = vm 
    this.exp = exp
    Dep.target = this
    let arr = exp.split('.').map(ele => ele.trim())
    let val = vm
    arr.forEach(key => {
        val = val[key]
    })
    Dep.target = null
}
Watcher.prototype.update = function() {
    let arr = this.exp.split('.')
    let val = this.vm
    arr.forEach(key => {
        val = val[key]
    })
    this.fn(val)
}