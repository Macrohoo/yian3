export interface AxiosOptionsTy {
  url: string,
  params: object,
  method: 'post' | 'get' | 'put' | 'delete',
  headers:  Record<string, string | number | boolean>
  expireInfo?: object
}
