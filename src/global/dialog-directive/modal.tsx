import { defineComponent, resolveDynamicComponent } from "vue";
import type { DefineComponent } from 'vue';
import Yian from '@/index'

const YaDialog = defineComponent({
  name: "YaDialogModal",
  props: {
    id: String,
    title: {
      type: String,
      default: "窗口名称",
    },
    //浮窗距离顶部的距离，单位是vh
    top: {
      type: String,
      default: "15",
    },
    hideFooter: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "730",
    },
    okText: {
      type: String,
      default: "确定",
    },
    // vue.2 ComponentConstructor构造函数 / vue.3 也能渲染注册过的组件
    content: [Object, Function]
  },
  data() {
    return {
      visible: true,
      customStyle: { top: `${Number(this.top)}vh` },
    };
  },
  methods: {
    handleCancel() {
      this.visible = false;
    },
    async handleOk() {
      this.visible = false
      //if beforeSubmit promise existed
      if ((this.$refs.cpo as {beforeSubmit: Function}).beforeSubmit) {
        await (this.$refs.cpo as {beforeSubmit: Function}).beforeSubmit();
      }
    }
  },
  render() {
    const { title, hideFooter, customStyle, width, okText, content, id } = this;
    const value = Yian.dialogComponentValue[id!]
    const amodalProps: any = {
      title: title,
      width: Number(width),
      okText: okText,
    };
    if (hideFooter) {
      amodalProps.footer = null;
    }
    //app.component('string') === resolveDynamicComponent('string' | resolved component) === () => import('xxx.vue') templated
    //all return resolved component
    const ResolvedComponent = resolveDynamicComponent(content) as DefineComponent<{}, {}, any>
    return (
      <a-modal
        class="ya-dialog"
        vModel_visible={this.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        style={customStyle}
        {...amodalProps}
      >
        <ResolvedComponent ref="cpo" {...{value}} />
      </a-modal>
    );
  },
});

export default YaDialog;
