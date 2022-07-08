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
      type: Number,
      default: '15'
    },
    hideFooter: {
      type: Boolean,
      default: true
    },
    width: {
      type:Number,
      default: 730
    },
    okText: {
      type: String,
      default: '确定'
    },
    // ComponentConstructor构造函数
    content: {
      type: [Object, Function]
    },
    value: [Object, Number, String]
  },
  data() {
    return {
      visible: true,
      affirm: false,
      customStyle: {"top": `${top}vh`}
    };
  },
  methods: {
    handleClosed() {
      this.visible = false;
    },
    async handleOk() {
      this.affirm = true;
      try {
        //@ts-ignore
        await this.$refs.cpo.affirm(this);   // 关闭窗口交给子component
      } catch (error) {
        console.error('affirm事件不存在[Please define affirm event in the component]!', error);
      }
    }
  },
  render() {
    const { title, hideFooter, customStyle, width, okText, content, value } = this
    return(
      <a-modal dialogClass={'ya-dialog'} bodyStyle={customStyle} v-model:visible="visible" title={title} width={width} footer={hideFooter ? null : 'true'} okText={okText} on-ok="handleOk" >
        <component ref="cpo" is={content} v-model={value}></component>
      </a-modal>


    )
  }
})

export default YaDialog
