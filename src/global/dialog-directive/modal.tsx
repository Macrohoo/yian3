import { defineComponent } from "vue";

const YaDialog = defineComponent({
  name: "YaDialogModal",
  props: {
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
    content: {
      type: [Object, Function],
    },
    value: [Object, Number, String],
  },
  data() {
    return {
      visible: true,
      affirm: false,
      customStyle: { top: `${Number(this.top)}vh` },
    };
  },
  methods: {
    handleCancel() {
      this.visible = false;
    },
    async handleOk() {
      this.affirm = true;
      try {
        //if promise existed
        //@ts-ignore
        if (this.$refs.cpo!.submit) {
          //@ts-ignore
          await this.$refs.cpo!.submit();
        }
        //@ts-ignore
        await this.$refs.cpo.affirm(this); // 关闭窗口交给子component
      } catch (error) {
        console.error(
          "affirm事件不存在[Please define affirm event in the component]!",
          error
        );
      }
    },
    //if promise need waited post
    async waitPost() {},
  },
  render() {
    const { title, hideFooter, customStyle, width, okText } = this;
    const amodalProps: any = {
      title: title,
      width: Number(width),
      okText: okText,
    };
    if (hideFooter) {
      amodalProps.footer = null;
    }
    return (
      <a-modal
        class="ya-dialog"
        vModel_visible={this.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        style={customStyle}
        {...amodalProps}
      >
        <div>kkk!!!!!!!!!!!!!</div>
      </a-modal>
    );
  },
});

export default YaDialog;
