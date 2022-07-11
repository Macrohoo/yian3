//全局注册组件UMD
import YaCheckbox from '@/components/ya-checkbox/index'
import type { App } from 'vue';
import dialogDirective from '@/global/dialog-directive/index'

function install(app: App) {
  app.directive('dialog', dialogDirective.directive)

  app.component('ya-checkbox', YaCheckbox)
}

import Yian from '@/index'

Yian.install = install

export default Yian
