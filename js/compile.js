/**
 * Created by zhaiyingying on 2018/6/24.
 */
import {Watcher} from './watcher.js'

export function Compile(el, vm) {
    vm.$el = document.querySelector(el)
    // 可以选择移到内存中去然后放入文档碎片中，节省开销
    let fragment = document.createDocumentFragment();
    let child = vm.$el.firstChild
    //while(child) {
        fragment.appendChild(child)
    //}
    replace(fragment, vm);
    vm.$el.appendChild(fragment); 
}
function replace (frag, vm) {
    Array.from(frag.childNodes).forEach(node => {
        let txt = node.textContent;
        let reg = /\{\{(.*?)\}\}/g;   // 正则匹配{{}}
        if (node.nodeType === 3 && reg.test(txt)) { // 即是文本节点又有大括号的情况{{}}
        !function replaceTxt() {
            node.textContent = txt.replace(reg, (matched, $1) => {
                new Watcher(vm,  $1, replaceTxt);  // 监听变化，重新进行匹配替换内容
                return vm[$1.trim()]
            });
        }()
         // 如果还有子节点，继续递归replace
         if (node.childNodes && node.childNodes.length) {
                replace(node);
            }
        }
    })
}