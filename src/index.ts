import YianConstructor from '@/constructor'
import { ConfigTy } from '~/base'

import type { DefineComponent } from 'vue';
//Component, ComputedOptions, MethodOptions
import { createApp } from 'vue'


export { installYian } from '@/installYian'
export default abstract class Yian {
  static components: any
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
      get: function (target: ConfigTy, property: keyof ConfigTy, _receiver) {
        if (property in target) {
          return target[property]  //the instance attributes of youstructor, such as utils
        }
        //else todo
      }
    })
    return _Proxy
  }

  static getComponent(moduleName: string, dialogModifier: string) {
    const key = moduleName + '_' + dialogModifier;
    return this.components[key] || false
  }

  static setComponent(moduleName: string, dialogModifier: string, component: DefineComponent) {
    const key = moduleName + '_' + dialogModifier;
    this.components[key] = component
  }

  static getVue3Vm(componentModal: any, props?: any) {
    //Pass props to the root component when the application instance is created
    const instance = createApp(componentModal, props)
    //after mounted on div is vm
    return instance.mount(document.createElement('div'))
  }

}
