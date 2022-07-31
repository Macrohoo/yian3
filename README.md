## 📦 Install
```shell
npm install yian3 -S
```
## Quick Start In Vue3

```typescript
//main.js

import { createYian } from 'yian3'
import 'yian3/dist/style.css';
/* import service from 'your interceptor filepath' */

const $_Y = {
  app,  //应用实例
  service, //import your axios interceptor 你的axios全局拦截器
  baseApi: Array<string> [接口前缀，如 '/v2' 或 '/api'，可填多个元组成数组]
};

app.use(createYian as any, $_Y)

```
```typescript
//global.d.ts 全局声明文件
export {}
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $yian: typeof import('yian3')
  }
}
```

### 支持 axios 原有功能，yian3 已添加在 1000ms 内重复请求限制
```typescript
export default defineComponent({
  methods: {
    getList() {
      //举例1 默认采用基础接口为baseApi数组中第一个
      this.$yian
        .axios({ url: 'user/login', method: 'post', params: { username: admin, password: 123456 }}, 1)
        .then(/* ... */);
      //举例2 默认采用基础接口为baseApi数组中第二个
      this.$yian
        .axios({
          url: '/academic/getAcademicField',
          method: 'get',
          params: { currentPage: 1, pageSize: 10 },
        }, 2)
        .then(/* ... */);
      //举例3 默认采用基础接口为baseApi数组中第一个
      this.$yian.axios({
        url: '/v2/qiniu/upload',
        method: 'post',
        params: formData,
        headers: { 'content-type': 'multipart/form-data' },        
      })  
    },
  }
})
```

## 🧊 Component
>- ## [ya-checkbox](https://github.com/Macrohoo/yian3/tree/master/src/components/ya-checkbox)
### 🔥 Directive
>- ## [v-dialog](https://github.com/Macrohoo/yian3/tree/master/src/global/dialog-directive)

## todo