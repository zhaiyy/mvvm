/**
 * Created by zhaiyingying on 2018/6/24.
 */
import {Dep} from './watcher.js'

export function observe(data, vm) {
    if (!data || typeof data !== 'object') {
        return;
    }
    return new Observe(data);
};

function Observe(data){
      // 取出所有属性遍历
      Object.keys(data).forEach(function(key) {
        let val =  data[key]
        observe(val)
        let dep = new Dep()
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 属性是否配置，以及可否删除
            get(){
                // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
                Dep.target && dep.addSub(Dep.target); 
                return val
            },
            set(newVal){
                if (val === newVal ) return
                console.log('监听到了'+val, newVal)
                val = newVal
                dep.notify()
            }
        })
    });
}