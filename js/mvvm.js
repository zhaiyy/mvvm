import {observe} from './oberver.js'
import {Compile} from './compile.js'
import {initComputed} from './computed.js'
import {initMethods} from './methods.js'
 function MVVM (options = {}) {
    this.$options = options
    let data = this._data = this.$options.data
    observe(data)
    // 数据代理 把data 对象里面的属性代理到this 指针下
    for (let key in data) {
        Object.defineProperty(this, key, {
            get() {
                return this._data[key]
            },
            set (newVal) {
                this._data[key] = newVal
            }
        })
    }
    /* computed 初始化 */
    initComputed.call(this)
    /* methods 初始化 */
    initMethods.call(this)
    /* 模板渲染 */
    new Compile(options.el, this)
    /* 执行mounted  方法 */
    options.mounted.call(this)
}
export default MVVM