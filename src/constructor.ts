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
    let { url, params, method, headers = {'content-type': 'application/json'} } = options;
    if(version && this.baseApi) {
      url = this.baseApi[version] + '/' + url
    }
    if(!version && this.baseApi) {
      url = this.baseApi[0] + '/' + url
    }
    return new Promise((resolve, reject) => {
      let data = {};
      if (method.toLowerCase() === 'get') data = { params };
      if (method.toLowerCase() === 'post' || method.toLowerCase() === 'put' || method.toLowerCase() === 'delete') data = { data: params };
      this.interceptor({
        url,
        method,
        ...data,
        headers,
        adapter: cache({
          time: 1000
        })
      }).then((res: any) => {
        resolve(res);
      }).catch((err: any) => {
        reject(err);
      })
    });
  }

}
