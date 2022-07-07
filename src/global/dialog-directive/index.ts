import utils from '@/utils/utils'

const dialogDirective: any = {
  _store: {},
  directive: {
    //@ts-ignore
    //el指令绑定到的元素,用于直接操作 DOM, 等价于vndoe.elm
    created(el, binding, vnode) {
      let key = vnode.elm.id
      dialogDirective._store[key] = binding.value || {}  //binding.value传递给指令的值
      utils.addEvent(el, 'click', () => {

      })
    }
  }
}
