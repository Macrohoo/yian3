import utils from '@/utils/utils'
import Yian from '@/index'
import modal from '@/global/dialog-directive/modal'

const dialogDirective: any = {
  _store: {},
  directive: {
    //el指令绑定到的元素,用于直接操作 DOM, 等价于vndoe.elm
    //@ts-ignore
    created(el, binding, vnode) {
      let key = vnode.elm.id
      if(!key) return console.error('id属性不存在!');
      dialogDirective._store[key] = binding.value || {}  //binding.value传递给指令的值
      utils.addEvent(el, 'click', () => {
        const value = dialogDirective._store[key]
        const title = el.getAttribute('title') ?? '窗口名称'; // 获取窗口标题
        const hideFooter = el.getAtrribute('hideFooter') ?? false; // 是否取消底部
        const okText = el.getAttribute('okText') ?? '确定'; // 确认按钮文案
        const width = el.getAttribute('width') ?? 730; // 设置宽度 number
        const top = el.getAttribute('top') ?? 15; // 设置距顶高度 number 隐形单位是vh
        const moduleName = el.getAttribute('module'); // 获取组件隶属主模块名称
        const dialogModifier = Object.keys(binding.modifiers).shift() || null; // 获取指令的修饰符 v-dialog.orderShipping.xxx中的orderShipping, 剔除xxx
        const vm = vnode.context;  //当前VNode的父虚拟节点上下文环境
        if(moduleName && dialogModifier) {
          let moduleComponentContent = Yian.getComponent(moduleName, dialogModifier)
          if(moduleComponentContent) {
            const instance = Yian.getVue3Vm(modal, {
              value,
              title,
              hideFooter,
              okText,
              width,
              top,
              moduleComponentContent, // registed module component
              visible: true
            })
            const domDiv = vm.$root.$el.appendChild(instance.$el); // Dom element after successful mounting
            // Monitor Remove Vue.property.$watch
            instance.$watch('visible', () => {
              //@ts-ignore
              instance.visible = false;
              vm.$root.$el.removeChild(domDiv);

              //@ts-ignore
              if(instance.affirm && vm.hasOwnProperty('reload')) {
                vm.reload() // If the context object routing for rendering template template needs to be overloaded
              }
            });

          } else {
            console.error('弹窗内容组件未注册!');
          }
        } else {
          console.error('module属性名称或v-dialog指令修饰符不能为空!');
        }
      })
    },

    // 需要考虑到vnode更新的情况(这种是vnode更新，但是按钮组件并没有销毁重建的情况，那我们需要去触发这个钩子来对store中的数据进行重新赋值)
    // 因为可能传入的value是一个变动的值，需要更新_store中的值
    //@ts-ignore
    beforeUpdate(el, binding, vnode, prevNode) {
      if(binding.value && vnode.elm.id) {
        delete dialogDirective._store[prevNode.elm.id]
        dialogDirective._store[vnode.elm.id] = binding.value
      } else {
        delete dialogDirective._store[prevNode.elm.id]
      }
    }
  }
}

export default dialogDirective
