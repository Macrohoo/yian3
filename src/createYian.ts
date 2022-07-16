import type { App } from 'vue';
import dialogDirective from '@/global/dialog-directive/index'
import Yian from '@/index'
import { ConfigTy } from '~/base'

export default {
  install(app: App, config: ConfigTy) {
    app.directive('dialog', dialogDirective.directive)

    app.config.globalProperties.$yian = Yian.content(config)
  }
}
