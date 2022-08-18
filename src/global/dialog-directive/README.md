# `v-dialog`
## 🐙 使用 `v-dialog` 指令打开弹窗体

```html
//Vue Click事件标签处使用v-dialg指令案例
<div v-for="(item, index) in List" :key="index">
  <a-button
    id="`${index}-order-shipping`"
    v-dialog.orderShipping="{a:index, b:item}"
    type="primary"
    module="order"
    width=1200
    top=40
    >发货</a-button
  >
</div>
```
### 🧊 指令标签属性列表 [自定义a-modal组件]

| 属性    |  可选性  |    类型  | 默认值   | 作用     |
|---------|---------|---------|---------|---------|
| id | 必须necessary | String | —— | key值，区别于其他按钮指令弹窗 |
| v-dialog.[xxx] | 必须necessary | —— | —— | [xxx]的值，必须跟Yian.setComponent方法中的第二个参数一致 |
| `v-dialog.[xxx] = value` 传递给指令的值 | 非必须unnecessary | any | {} | 传给dialog内部子组件的值，支持变化的数据传入 |
| module | 必须necessary | String | —— | 隶属模块名称，必须跟Yian.setComponent方法中的第一个参数一致 |
| title | 非必须unnecessary | String | 操作窗口 | 弹窗体标题 |
| hideFooter | 非必须unnecessary | Boolean | false | 是否隐藏页脚 |
| okText | 非必须unnecessary | String | 确定 | 确认按钮文字修改 |
| width | 非必须unnecessary | Number | 730 | 弹窗体宽度，单位px |
| top | 非必须unnecessary | Number | 15 | 弹窗体距顶高度，单位vh |

### 🧊 弹窗内部组件示例
❗️注意：
1、原则上本组件setup中getCurrentInstance()并不是项目app内部组件实例。
2、但为写代码便利，继承了app内部组件实例appContext.config.globalProperties属性。
```html
//orderShipping组件内容
<template>
  orderShipping主内容块
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  //必须这么写才能传入v-dialog.orderShipping的value，且value已支持响应式
  props: ['value'],
  methods: {
    //beforeSubmit 点击确定按钮前，有需要的异步请求
    async beforeSubmit() {}
  },
  setup () {
    console.log(getCurrentInstance()?.appContext.config.globalProperties, '😄')
    return {}
  }
});
</script>
```

### 🧊 项目结构目录建议
```
src
├── layout //公共布局
├── router //vue-router
│   └── index.ts
├── store //piana
│   └── index.ts
├── styles //公共样式
│   └── ....scss
├── icons  //icons目录
│   ├── common
│   │   └── xx.svg
│   └── js
│       └── symbolIcon.ts
├── components //公用组件
│   └── ....vue
├── views  //页面
├── modules  //dialog内部组件模块存放位置
│   ├── order  //隶属模块名
│   │   └── orderShipping.vue  //隶属模块子组件
│   └── index.ts 模块注册
├── App.vue
└── main.ts
```

### 🧊 导入、导出
> - 隶属模块成块导出注册
```typescript
import Yian from 'yian';
import orderShipping from './order/orderShipping.vue';

export default function registerModules() {
  //参数一、参数二 与属性列表中的 module 和 v-popup.[xxx] 指令修饰符需一致
  Yian.setComponent('order', 'orderShipping', orderShipping);
}
```
> - 打包入口文件中调用注册

```javascript
//放在main.ts最下面
import registerModules from '@/modules/index.ts';

registerModules()
```


### 设计的思路

>- 方案一：当时考虑的是在指令click的时候注册当前的modal组件为全局组件，然后根据当前指令的vm.$root上，挂载已全局组册的组件，尝试！！结果是肯定不行的！只能挂载普通标签，组件是需要被vnode转化过的，变成标准的dom。
>- 方案二：依旧采用modal的vm生成方式直接mount。需要一点点改。。这里和vue2有点不同，因为vue2中是Vue.use实现的，vm生成时是有项目组件库use的环境的，但在Vue3中需要单独use组件库。而且目前来看element甚至无法直接use自己的modal。antd可以，但无需自定义挂载。