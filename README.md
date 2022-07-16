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
  /* 一些属性 */
  service, //import your axios interceptor 你的axios全局拦截器

  //举例2:  baseApi: Array<string> [接口前缀，如 '/v2' 或者 '/api'，可填多个组成数组]
};

app.use(createYian as any, $_Y)

```