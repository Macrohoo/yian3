import {
  defineComponent
} from "vue";

const YaDialog = defineComponent({
  name: 'YaDialogModal',
  props: {
    title: {
      type: String,
      default: '窗口名称'
    },
    //浮窗距离顶部的距离，单位是vh
    top: {
      type: String,
      default: '15'
    },
    hideFooter: {
      type: Boolean,
      default: true
    },
    width: {
      type:String,
      default: '730'
    },
    okText: {
      type: String,
      default: '确定'
    },
    // vue.2 ComponentConstructor构造函数 / vue.3 也能渲染注册过的组件
    content: {
      type: [Object, Function]
    },
    value: [Object, Number, String]
  },
  data() {
    return {
      visible: true,
      affirm: false,
      customStyle: {"top": `${Number(this.top)}vh`},
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
        if(this.$refs.cpo!.submit) {
          //@ts-ignore
          await this.$refs.cpo!.submit()
        }
        //@ts-ignore
        await this.$refs.cpo.affirm(this);   // 关闭窗口交给子component
      } catch (error) {
        console.error('affirm事件不存在[Please define affirm event in the component]!', error);
      }
    },
    //if promise need waited post
    async waitPost() {

    }
  },
  render() {
    const { title, hideFooter, customStyle, width, okText, content, value } = this
    return(
      <a-modal dialogClass={'ya-dialog'} bodyStyle={customStyle} vModel_visible={this.visible} title={title} width={width} footer={hideFooter ? null : 'true'} okText={okText} on-ok="handleOk" on-cancel="handleCancel">
        <component ref="cpo" is={content} v-model={value}></component>
      </a-modal>
    )
  }
})

export default YaDialog
