declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof import('ant-design-vue')['message']
  }
}

export {}
