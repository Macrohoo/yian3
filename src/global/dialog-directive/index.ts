import utils from '@/utils/utils'
import Yian from '@/index'
import modal from '@/global/dialog-directive/modal'

const dialogDirective: any = {
  _store: {},
  directive: {
    //@ts-ignore
    created(el, binding, vnode) {
      //el指令绑定到的元素,用于直接操作 DOM, 等价于vndoe.elm
      let key = vnode.props.id //key id
      if(!key) return console.error('id属性不存在!');
      Yian.dialogComponentValue[key] = binding.value || {}  //binding.value传递给指令的值
      utils.addEvent(el, 'click', () => {
        const title = el.getAttribute('title') ?? '窗口名称'; // 获取窗口标题
        const hideFooter = el.getAttribute('hideFooter') ?? false; // 是否取消底部
        const okText = el.getAttribute('okText') ?? '确定'; // 确认按钮文案
        const width = el.getAttribute('width') ?? 730; // 设置宽度 number
        const top = el.getAttribute('top') ?? 15; // 设置距顶高度 number 隐形单位是vh
        const moduleName = el.getAttribute('module'); // 获取组件隶属主模块名称
        const dialogModifier = Object.keys(binding.modifiers).shift() || null; // 获取指令的修饰符 v-dialog.orderShipping.xxx中的orderShipping, 剔除xxx
        const vm = vnode.dirs[0].instance;  //当前VNode的父虚拟节点上下文环境
        // console.log(vm, '我想要的vm')
        // console.log(vnode, '我想要的vnode')
        if(moduleName && dialogModifier) {
          let moduleComponentContent = Yian.getComponent(moduleName, dialogModifier)
          if(moduleComponentContent) {
            const instance = Yian.getVue3Vm('dialog', modal, {
              id: key,
              title,
              hideFooter,
              okText,
              width,
              top,
              content: moduleComponentContent, // registed module component
              visible: true
            })
            // Monitor Remove Vue.property.$watch
            instance?.$watch('visible', () => {
              Yian.destoryVue3Vm('dialog', Yian.temporaryDialogVm)
              //destory application instance
              //needn't to use document?.querySelector('.ant-modal-root')?.remove() agian
              //@ts-ignore
              if(instance.affirm && vm.$root.reload !== undefined) {
                vm.$root.reload() // If the context object routing for rendering template template needs to be overloaded
              }
            });

          } else {
            console.error('弹窗内容子组件未注册!');
          }
        } else {
          console.error('module属性名称或v-dialog指令修饰符不能为空!');
        }
      })
    },
    // the vnode update situation, dialog isn't destroyed, but value is changing
    // dialogComponentValue is a reactive object must be changed
    // @ts-ignore
    beforeUpdate(el, binding, vnode, prevNode) {
      Yian.dialogComponentValue[vnode.props.id] = binding.value
    }
  }
}

export default dialogDirective
