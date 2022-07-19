import {
  defineComponent
} from "vue";
import { withInstall } from "@/components/_util/partRegisterFun";
import imgObject from '@/icons/imgJson.json'

const YaCheckbox = defineComponent({
  name: "YaCheckbox",
  props: {
    //主盒子宽度，不含label的上下
    width: {
      type: Number,
      default: 84,
    },
    //主盒子高度，不含label的上下
    height: {
      type: Number,
      default: 84,
    },
    //链接图宽度
    srcWidth: {
      type: Number,
      default: 64,
    },
    //链接图长度
    srcHeight: {
      type: Number,
      default: 64,
    },
    //已选中选项与<input>双向绑定
    selectData: {
      type: Array,
    },
    //指定<input>元素value的值，且部分耦合属性
    options: {
      type: Object,
    },
    linkSrc: {
      type: String,
      default: imgObject["le-icon-folder"]
    },
  },
  data() {
    return {
      hoverKey: false,
    };
  },
  computed: {
    //resolve props one-way streaming
    selectVal: {
      get() {
        return this.selectData;
      },
      set(val: any) {
        this.$emit('selectX', val);
      },
    },
  },
  methods: {
    hoverChange() {
      this.hoverKey ? (this.hoverKey = false) : (this.hoverKey = true);
    },
  },
  render() {
    const { width, height, srcWidth, srcHeight, options, linkSrc } = this;
    let linkImgStyle: object;
    this.hoverKey
      ? (linkImgStyle = { width: `${srcWidth + 4}px`, height: `${srcHeight + 4}px`, borderRadius: '6px' })
      : (linkImgStyle = { width: `${srcWidth}px`, height: `${srcHeight}px`, borderRadius: '6px' });
    return (
      <label class="ya-label" style={{ width: `${width + 12}px`, height: `${height}px` }}>
        <input type="checkbox" class="ya-select" value={options} v-model={this.selectVal} />
        <div
          class="flex flex-direction justify-center align-center"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <img src={imgObject["le-icon-ziluobo"]} class="icon"/>
          <div style="position: relative">
            <img
              class="videoFrame"
              v-show={options?.type === 'video'}
              style={linkImgStyle}
              src={imgObject["le-icon-video"]}
              onMouseenter={this.hoverChange.bind(this)}
              onMouseleave={this.hoverChange.bind(this)}
            ></img>
            <img
              style={linkImgStyle}
              src={linkSrc}
              onMouseenter={this.hoverChange.bind(this)}
              onMouseleave={this.hoverChange.bind(this)}
            ></img>
          </div>
          <span>{options?.name}</span>
        </div>
      </label>
    );
  }
});


export default withInstall(YaCheckbox);
