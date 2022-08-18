import utils from '@/utils/utils'
import cache from './axiosCache'

import { AxiosOptionsTy } from '~/axios'
import { ConfigTy } from '~/base'



export default class YianConstructor {
  interceptor: any
  baseApi: Array<string>
  utils: object

  constructor(config: ConfigTy) {
    this.interceptor = config.service
    this.baseApi = config.baseApi!
    this.utils = utils
  }

  axios<T>(options: AxiosOptionsTy, version?: number) :Promise<T>{
    let { url, params, method, headers = {'content-type': 'application/json'}, expireInfo } = options;
    if(version && this.baseApi) {
      url = this.baseApi[version] + '/' + url
    }
    if(!version && this.baseApi) {
      url = this.baseApi[0] + '/' + url
    }
    return new Promise((resolve, reject) => {
      let data = {};
      if (method.toLowerCase() === 'get' && params) data = { params };
      if ((method.toLowerCase() === 'post' || method.toLowerCase() === 'put' || method.toLowerCase() === 'delete') && params) data = { data: params };
      let axiosBody = {
        url,
        method,
        headers,
        adapter: cache({
          time: 1000
        })
      }
      if(expireInfo) {
        Object.assign(axiosBody, {expireInfo})
      }
      if(Object.keys(data).length > 0) {
        Object.assign(axiosBody, {...data})
      }
      this.interceptor(axiosBody).then((res: any) => {
        resolve(res);
      }).catch((err: any) => {
        reject(err);
      })
    });
  }

}
