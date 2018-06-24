/**
 * Created by zhaiyingying on 2018/6/24.
 */
function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};
function Observer(data){
    this.data = data
    this.forDefine(this.data)
}
Observer.prototype = {
    forDefine(){
        for(let key in this.data){
            if(this.data.hasOwnProperty(key)){
                this.definedReactive(key,this.data[key])
            }
        }
    },
    definedReactive(key,val){
        observe(val)
        let dep = new Dep()
        Object.defineProperty(this.data,key,{
            get(){
                console.log(Dep.target)
                if(Dep.target){
                    dep.depend()
                }
                return val
            },
            set(newVal){
                console.log(newVal)
                console.log('监听到了'+val,newVal)
                val = newVal
                dep.notify()
            }
        })
    }

}
function Dep() {
    this.subs = []
    this.target = null
}
Dep.prototype = {
    addSub(sub){
        this.subs.push(sub)
    },
    depend(){
       console.log(Dep.target)
    },
    notify(){
        this.subs.forEach(ele => {
            ele.update()
        })
    }
}