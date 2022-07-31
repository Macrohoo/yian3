import axios from 'axios';
import { baseObjTy } from '~/base';
import type { AxiosRequestConfig } from 'axios'
import { nanoid } from 'nanoid'

// Store the requested data
const cache = {
  data: {} as baseObjTy,
  set(key: string, data: any) {
    this.data[key] = data;
  },
  get(key: string) {
    return this.data[key];
  },
  clear(key: string) {
    delete this.data[key];
  }
};

//prevent duplicate requests
//this function has finished the axios request, and get the response
export default (options: baseObjTy = {time: 0}) => (config: AxiosRequestConfig) => {
  const uniqueKey = nanoid()
  let responsePromise = cache.get(uniqueKey)
  if(!responsePromise) {
    responsePromise = (async () => {
      try {
        const response = await axios.defaults.adapter!(config);
        return Promise.resolve(response);
      } catch (reason) {
        cache.clear(uniqueKey);
        return Promise.reject(reason);
      }
    })()
    cache.set(uniqueKey, responsePromise)
    if (options.time !== 0) {
      setTimeout(() => {
        cache.clear(uniqueKey);
      }, options.time);
    }
  }
  //first to prevent pollute origin data
  //responsePromse is a promise, this setup is the truely return, need to be resolved
  return responsePromise.then((data: any) => JSON.parse(JSON.stringify(data)));
}

// 这里可能会对config产生疑问，因为在axios中adapter作为适配器允许使用者自定义请求处理，它是一个function见下，且在源代码中执行顺序，此时config已经完成了合并。
// Detail See: https://github.com/axios/axios/blob/master/lib/adapters/README.md
// adapter: function (config) {
//   /* ... */
// }
