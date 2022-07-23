import utils from '@/utils/utils'
import Yian from '@/index'
import modal from '@/global/dialog-directive/modal'

const dialogDirective: any = {
  _store: {},
  directive: {
    //el指令绑定到的元素,用于直接操作 DOM, 等价于vndoe.elm
    //@ts-ignore
    created(el, binding, vnode) {
      let key = vnode.props.id
      if(!key) return console.error('id属性不存在!');
      dialogDirective._store[key] = binding.value || {}  //binding.value传递给指令的值
      utils.addEvent(el, 'click', () => {
        const value = dialogDirective._store[key]
        const title = el.getAttribute('title') ?? '窗口名称'; // 获取窗口标题
        const hideFooter = el.getAttribute('hideFooter') ?? false; // 是否取消底部
        const okText = el.getAttribute('okText') ?? '确定'; // 确认按钮文案
        const width = el.getAttribute('width') ?? 730; // 设置宽度 number
        const top = el.getAttribute('top') ?? 15; // 设置距顶高度 number 隐形单位是vh
        const moduleName = el.getAttribute('module'); // 获取组件隶属主模块名称
        const dialogModifier = Object.keys(binding.modifiers).shift() || null; // 获取指令的修饰符 v-dialog.orderShipping.xxx中的orderShipping, 剔除xxx
        const vm = vnode.dirs[0].instance;  //当前VNode的父虚拟节点上下文环境
        console.log(vm, '我想要的vm')
        console.log(vnode, '我想要的vnode')
        if(moduleName && dialogModifier) {
          let moduleComponentContent = Yian.getComponent(moduleName, dialogModifier)
          if(moduleComponentContent) {
            const instance = Yian.getVue3Vm('dialog', modal, {
              value,
              title,
              hideFooter,
              okText,
              width,
              top,
              content: moduleComponentContent, // registed module component
              visible: true
            })
            console.log(instance, 'instance!!!!!!!')
            // Monitor Remove Vue.property.$watch
            instance?.$watch('visible', () => {
              document?.querySelector('.ant-modal-root')?.remove()
              Yian.destoryVue3Vm('dialog', Yian.temporaryDialogVm) //destory application instance
              //todo 销毁内置组件
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

    // 需要考虑到vnode更新的情况(这种是vnode更新，但是按钮组件并没有销毁重建的情况，我们需要对value这个props重新赋值)
    // todo
    //@ts-ignore
    beforeUpdate(el, binding, vnode, prevNode) {
      //console.log(el, binding, vnode, prevNode, 'beforeUpdate~~~~~~~~~')
      //@ts-ignore
      // Yian.temporaryDialogVm._component.methods.eventProps({
      //   az: vnode.dirs[0].instance.az,
      //   bz: vnode.dirs[0].instance.bz
      // })
    }
  }
}

export default dialogDirective
