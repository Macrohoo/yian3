import YianConstructor from '@/constructor'
import { ConfigTy, Maybe } from '~/base'

import type { DefineComponent } from 'vue';
//Component, ComputedOptions, MethodOptions
import { createApp, App } from 'vue'
import Antd from 'ant-design-vue'

export { default as createYian } from '@/createYian'
export default abstract class Yian {
  static components: Record<string, DefineComponent<any, any, any, any, any, any, any, any, any, any, any>> = {}
  static install: Function
  static temporaryDialogVm: Maybe<App>

  static _validator: WeakMap<object, any> = new WeakMap()
  static _upload: boolean = false

  static content(config: ConfigTy = {}) {
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

  static setComponent(moduleName: string, dialogModifier: string, component: DefineComponent<any, any, any, any, any, any, any, any, any, any, any>) {
    const key = moduleName + '_' + dialogModifier;
    this.components[key] = component
    //register component
  }

  static getVue3Vm(type: string, componentModal: any, props?: any) {
    //Pass props to the root component when the application instance is created
    const instance = createApp(componentModal, props)
    if(type.toLowerCase() === 'dialog') {
      this.temporaryDialogVm = instance
      //after mounted on div is vm, return instance object has $attributes
      return instance.use(Antd).mount(document.createElement('div'))
    }
    //todo elseif
  }

  static destoryVue3Vm(type: string, app: Maybe<App>) {
    app?.unmount()
    if(type.toLowerCase() === 'dialog') {
      this.temporaryDialogVm = null
    }
    //todo elseif
  }

}
