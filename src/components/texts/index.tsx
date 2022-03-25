import { defineComponent, PropType, toRefs } from 'vue'
import './index.scss'

export default defineComponent({
  name: 'texts',
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return () => (
      <div class="texts">
        <h2
          style={
            props.options.titleFontSize
              ? { fontSize: props.options.titleFontSize + 'px' }
              : ''
          }
        >
          {props.options.title}
        </h2>
        <p
          style={
            props.options.remarksFontSize
              ? { fontSize: props.options.remarksFontSize + 'px' }
              : ''
          }
        >
          {props.options.remarks}
        </p>
      </div>
    )
  }
})
