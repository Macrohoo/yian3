## 🐙 使用 v-dialog 指令打开弹窗体

```html
//Vue Click事件标签处使用v-popup指令案例
<div v-for="(item, index) in List" :key="index">
  <a-button
    id="`${index}-order-shipping`"
    v-dialog.orderShipping="{a:index, b:item}"
    type="primary"
    module="order"
    width="1200"
    >发货</a-button
  >
</div>
```
#### 💥 指令标签属性列表 [自定义a-modal组件]

| 属性    |  可选性  |    类型  | 默认值   | 作用     |
|---------|---------|---------|---------|---------|
| id | 必须necessary | String | —— | key值，区别于其他按钮指令弹窗 |
| v-dialog.[xxx] | 必须necessary | —— | —— | .[xxx]中的值，必须跟Yian.setComponent方法中的第二个参数一致 |
| module | 必须necessary | String | —— | 隶属模块名称，必须跟Yian.setComponent方法中的第一个参数一致 |
| title | 非必须unnecessary | String | 操作窗口 | 弹窗体标题 |
| hideFooter | 非必须unnecessary | Boolean | false | 是否隐藏页脚 |
| okText | 非必须unnecessary | String | 确定 | 确认按钮文字修改 |
| width | 非必须unnecessary | Number | 730px | 弹窗体宽度 |
| top | 非必须unnecessary | String | 15 | 弹窗体距顶高度，单位vh |

#### ❤️ 弹窗内部组件示例

```html
//orderShipping组件内容
<template>
  orderShipping主内容块
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  //props须写成这样才能传入值
  props: ['value'],
  methods: {
    //affirm事件必须写上，此方法已与确认按钮耦合。
    async affirm(vlm) {
      await this.subimt()
      vlm.handleCancel();  //handleClosed方法控制el-dialog窗口关闭
    },
    //subimt 点击确定按钮时，有需要的异步请求
    async subimt() {}
  },
});
</script>
```

#### ❤️ 项目结构目录建议
```
src
├── layout //公共布局
├── router //vue-router
│   └── index.js
├── store //piana
│   └── index.js
├── styles //公共样式
│   └── ....scss
├── icons  //icons目录
│   ├── common
│   │   └── xx.svg
│   └── js
│       └── symbolIcon.js
├── components //公用组件
│   └── ....vue
├── views  //页面
│   └── order  //隶属模块名
│       ├── components //隶属模块子组件
│       │   └── orderShipping.vue
│       └── index.js
├── App.vue
└── main.ts
```

#### ❤️ 导入、导出
> - 隶属模块成块导出注册
```typescript
import Yian from 'yian';
import orderShipping from './components/orderShipping.vue';

export default function registerOrder() {
  //参数一、参数二 与属性列表中的 module 和 v-popup.[xxx] 指令修饰符需一致
  Yian.setComponent('order', 'orderShipping', orderShipping);
}
```
> - 打包入口文件中调用注册

```javascript
//放在main.ts最下面
import registerOrder from '@/views/order/index.js';

registerOrder()
```