## 🐙 使用 ya-checkbox 组件
#### 💥 标签attribute 属性列表
| 属性     |  可选性  |   类型  |  默认值  |   作用   |
|---------|---------|---------|---------|---------|
|selectedData|必须necessary|Array|——|指定已选中的选项|
|options|必须necessary|Object { name: string, type: 'image' ｜ 'video' }|——|input原始标签绑定的value值，耦合部分属性|
|linkSrc|非必须unnecessary|urlLink｜base64|一张文件图片|外链图片地址|
|width|非必须unnecessary|Number|84px|主盒子宽度|
|height|非必须unnecessary|Number|84px|主盒子长度|
|srcWidth|非必须unnecessary|Number|64px|链接图宽度|
|srcHeight|非必须unnecessary|Number|64px|链接图长度|

#### 💥 标签Events 事件列表

|事件名称  |说明  |回调参数 Function(checkedValue)  |
|---------|---------|---------|
|selectX  | 选中或取消发生变化时回调函数 | 指定已选中的选项 |

![组件形态](https://kodo.mboke.top/ya-checkbox.gif)

#### ❤️ ya-checkbox组件示例
```html
<ya-checkbox
  @selectX="(checkedValue) => (selectMaterials = checkedValue)"
  :options="item"
  :selectData="selectMaterials"
  :linkSrc="item.type === 'video' ? item.url : item.thumbnail"
  :srcWidth="64"
  :srcHeight="64"
  :width="104"
  :height="104"
></ya-checkbox>
```
```typescript
import { YaCheckbox } from 'yian3/es/components/index'

export default defineComponent({
  components: {
    YaCheckbox
  },
})
```