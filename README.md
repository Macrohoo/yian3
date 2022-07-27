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

  //举例2:  baseApi: Array<string> [接口前缀，如 '/v2' 或者 '/api'，可填多个组成数组]
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

## 🧊 Component
>- ## [ya-checkbox](https://github.com/Macrohoo/yian3/tree/master/src/components/ya-checkbox)
### 🔥 Directive
>- ## [v-dialog](https://github.com/Macrohoo/yian3/tree/master/src/global/dialog-directive)

## todo