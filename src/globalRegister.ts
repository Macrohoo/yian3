//全局注册组件UMD
import YaCheckbox from '@/components/ya-checkbox/index'
import type { App } from 'vue';

function install(app: App) {
  app.component('ya-checkbox', YaCheckbox)
}

import Yian from '@/index'

Yian.install = install

export default Yian
