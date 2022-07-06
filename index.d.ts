//主声明文件
//-------axios--------->
export interface AxiosOptionsTy {
  url: string,
  params: object,
  method: 'post' | 'get' | 'put' | 'delete',
  headers:  Record<string, string | number | boolean>
}

//-------base---------->
export interface ConfigTy {
  service?: any,
  baseApi?: Array<string>
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof import('ant-design-vue')['message']
  }
}

export {}
