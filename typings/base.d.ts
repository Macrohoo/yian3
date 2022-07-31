import type { App } from 'vue';
export interface ConfigTy {
  app?: App
  service?: any,
  baseApi?: Array<string>
}

export type Maybe<T> = T | undefined | null


export interface baseObjTy {
  [propName: string | number]: any
}
