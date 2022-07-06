//import { createApp } from 'vue'
import YianConstructor from '@/constructor'
import { ConfigTy } from '~/base'



export default abstract class Yian {
  static components: object
  static install: Function

  static _validator: WeakMap<object, any>
  static _upload: boolean

  static content(config: ConfigTy = {}) {
    this._validator = new WeakMap()
    this._upload = false
    return this.getProxy(config)
  }

  static getProxy(config: ConfigTy = {}) {
    var _Proxy = new Proxy(new YianConstructor(config), {
      get: function(target: ConfigTy, property: keyof ConfigTy, _receiver) {
        if(property in target) {
          return target[property]  //the instance attributes of youstructor, such as utils
        }
        //else todo
      }
    })
    return _Proxy
  }


  static registerComponent() {

  }


}
