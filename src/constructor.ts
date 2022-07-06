import utils from '@/utils/utils'

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

  axios<T>(options: AxiosOptionsTy) :Promise<T>{
    const { url, params, method, headers = {'content-type': 'application/json'} } = options;
    return new Promise((resolve, reject) => {
      let data = {};
      if (method.toLowerCase() === 'get') data = { params };
      if (method.toLowerCase() === 'post' || method.toLowerCase() === 'put' || method.toLowerCase() === 'delete') data = { data: params };
      this.interceptor({
        url,
        method,
        ...data,
        headers,
        // adapter: cache({
        //   time: 1000
        // })
      }).then((res: any) => {
        resolve(res);
      }).catch((err: any) => {
        reject(err);
      })
    });
  }

}
