import type { App } from 'vue';
import dialogDirective from '@/global/dialog-directive/index'

export function installYian(app: App) {
  app.directive('dialog', dialogDirective.directive)
}
